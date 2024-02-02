import prisma from '@/libs/prismadb'
import moment from 'moment'

export default async function getGraphData() {
  try {
    // get the statr end end dates for the data range(7 days)
    const startDate = moment().subtract(5, 'days').startOf('day')
    const endData = moment().endOf('day')

    // query the database to get order data grouped by createdAt
    const result = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startDate.toISOString(),
          lte: endData.toISOString(),
        },
        status: 'complete',
      },
      _sum: {
        amount: true,
      },
    })

    // initialize an object to aggregate the data by day
    const aggregatedData: {
      [day: string]: { day: string; date: string; amount: number }
    } = {}

    // create a clone of the start date to iterate over each day
    const currentDate = startDate.clone()

    // iterate over each day in the date range
    while (currentDate <= endData) {
      // format the da as a string
      const day = currentDate.format('dddd')
      console.log('day', day, currentDate)

      // initialize the aggregated data for the day with the day, date, and total amount
      aggregatedData[day] = {
        day,
        date: currentDate.format('YYYY-MM-DD'),
        amount: 0,
      }

      // move to the next day
      currentDate.add(1, 'day')
    }

    // calculate the total amount for each day by summing the order amounts
    result.forEach(entry => {
      const day = moment(entry.createdAt).format('dddd')
      const amount = entry._sum.amount || 0
      aggregatedData[day].amount += amount
    })

    // convert the aggregated object to an array and sort it by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    )

    // return the formatted data
    return formattedData
  } catch (err: any) {
    throw new Error(err)
  }
}
