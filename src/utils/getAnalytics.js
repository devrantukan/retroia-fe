const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs').promises;
const path = require('path');

// Initialize the Analytics Data client
const credentialsPath = path.join(__dirname, 'notional-cirrus-460311-i3-ef5697c5ef55.json');

async function getAnalyticsData() {
  try {
    // Check if credentials file exists
    try {
      await fs.access(credentialsPath);
    } catch (error) {
      console.error('Error: Credentials file not found at:', credentialsPath);
      console.error('Please ensure the service account credentials file is present in the correct location.');
      process.exit(1);
    }

    // Read and parse credentials
    const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf8'));
    
    // Initialize client with explicit credentials
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      projectId: credentials.project_id,
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
    await fs.mkdir(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, 'analytics-routes.json');
    await fs.writeFile(outputPath, JSON.stringify(routeData, null, 2));

    console.log('Analytics data has been successfully saved to:', outputPath);
    return routeData;
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    if (error.code === 16) {
      console.error('\nAuthentication Error:');
      console.error('1. Make sure the service account credentials file is present and readable');
      console.error('2. Verify that the service account has the necessary permissions');
      console.error('3. Check if the credentials file contains valid JSON with client_email and private_key');
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
