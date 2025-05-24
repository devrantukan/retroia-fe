const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs');
const path = require('path');

async function getAnalyticsData() {
  try {
    // Read credentials from base64 environment variable
    const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
    if (!base64) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_BASE64 environment variable is not set');
    }
    let credentials;
    try {
      const jsonString = Buffer.from(base64.replace(/\s/g, ''), 'base64').toString('utf8');
      credentials = JSON.parse(jsonString);
    } catch (err) {
      throw new Error('Failed to decode or parse GOOGLE_SERVICE_ACCOUNT_BASE64: ' + err.message);
    }

    // Initialize the Google Analytics client
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
        project_id: credentials.project_id
      }
    });

    const propertyId = '428297775';

    console.log('Fetching analytics data...');
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '2020-01-01',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
      ],
    });

    console.log('Processing analytics data...');
    // Group data by ID and sum up page views
    const combinedData = response.rows.reduce((acc, row) => {
      const path = row.dimensionValues[0].value;
      const portfoyMatch = path.match(/\/emlak\/portfoy\/(\d+)(?:\/|$)/);
      
      if (portfoyMatch) {
        const id = portfoyMatch[1];
        const pageViews = parseInt(row.metricValues[0].value);
        
        if (!acc[id]) {
          acc[id] = {
            path: `/emlak/portfoy/${id}/`,
            totalPageViews: 0,
            id
          };
        }
        
        acc[id].totalPageViews += pageViews;
      }
      
      return acc;
    }, {});

    // Convert to array and sort by page views
    const routeData = Object.values(combinedData)
      .sort((a, b) => b.totalPageViews - a.totalPageViews);

    // Save the data to public directory
    const outputDir = path.join(__dirname, '../../public/data');
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, 'analytics-routes.json');
    fs.writeFileSync(outputPath, JSON.stringify(routeData, null, 2));

    console.log('Analytics data has been successfully saved to:', outputPath);
    return routeData;
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    if (error.code === 16) {
      console.error('\nAuthentication Error:');
      console.error('1. Make sure the GOOGLE_SERVICE_ACCOUNT_BASE64 environment variable is set and valid');
      console.error('2. Verify that the service account has the necessary permissions');
      console.error('3. Check if the credentials JSON contains valid client_email and private_key');
    }
    throw error;
  }
}

// Export the function for use in other files
module.exports = { getAnalyticsData };

// If this file is run directly, execute the function
if (require.main === module) {
  getAnalyticsData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
