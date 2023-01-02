import prisma from '../../../lib/prisma';
import {  Prisma } from '@prisma/client'
// import toast, { Toaster } from 'react-hot-toast';

export default async function handle(req, res) {
  const { values } = req.body;
  // console.log("🚀 ~ file: newCalculation.ts:21 ~ handle ~ values.CalculationRows", values.calculationRows)

  var response = {}
  try {
    response = await prisma.calculation.create({
      data: {
        title: values.name,
        authorClerkId: values.authorClerkId,
        months: values.months,
        totalSupply: values.totalSupply,
        CalculationRows: {
          createMany: {
            data: values.calculationRows,
          }
            
        }
      }
    })
  
  } catch (e) {
    console.log(e)
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        // res.statusText = 'Unique Constraint. Slug might already exist!'
        return res.status(500).send({ error: 'Entry already exists!' })
        // console.log(
        //   'There is a unique constraint violation, a new user cannot be created with this email'
        // )
      }
    }
    // notify()
    throw e
  }

  // console.log(response)
  return res.json(response);
  // return res.status(200)
}
