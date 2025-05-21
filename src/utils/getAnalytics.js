const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const fs = require('fs').promises;
const path = require('path');

// Initialize the Analytics Data client
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: path.join(__dirname, 'notional-cirrus-460311-i3-ef5697c5ef55.json'),
});

async function getAnalyticsData() {
  try {
    const propertyId = '428297775';

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

    await fs.writeFile(
      path.join(outputDir, 'analytics-routes.json'),
      JSON.stringify(routeData, null, 2)
    );

    console.log('Analytics data has been successfully saved to:', outputDir);
    return routeData;
  } catch (error) {
    console.error('Error fetching analytics data:', error);
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
