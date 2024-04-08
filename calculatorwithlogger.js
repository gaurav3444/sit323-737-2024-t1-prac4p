const express= require("express");
const res = require("express/lib/response");
const app= express();
const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

// Function to calculate addition
const add= (n1,n2) => {
    return n1+n2;
}

//Function to calculate subtraction
const subtract = (n1, n2) => {
  return n1 - n2;
}

//Function to calculate multiplication
const multiply = (n1, n2) => {
  return n1 * n2;
}

//Function to calculate division
const divide = (n1, n2) => {
  if (n2 === 0) {
      throw new Error("Division by zero");
  }
  return n1 / n2;
}

app.get("/add", (req,res)=>{
    try{
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    const result = add(n1,n2);
    logger.info('Addition: n1 = '+n1+' and n2 = '+n2+' ,Result = '+result);
    res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});

app.get("/subtract", (req, res) => {
  try {
      const n1 = parseFloat(req.query.n1);
      const n2 = parseFloat(req.query.n2);
      if (isNaN(n1)) {
          logger.error("n1 is incorrectly defined");
          throw new Error("n1 incorrectly defined");
      }
      if (isNaN(n2)) {
          logger.error("n2 is incorrectly defined");
          throw new Error("n2 incorrectly defined");
      }
      const result = subtract(n1, n2);
      logger.info('subtraction: n1 = '+n1+' and n2 = '+n2+' ,Result = '+result);
      res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
      logger.error(error.message);
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/multiply", (req, res) => {
  try {
      const n1 = parseFloat(req.query.n1);
      const n2 = parseFloat(req.query.n2);
      if (isNaN(n1)) {
          logger.error("n1 is incorrectly defined");
          throw new Error("n1 incorrectly defined");
      }
      if (isNaN(n2)) {
          logger.error("n2 is incorrectly defined");
          throw new Error("n2 incorrectly defined");
      }
      const result = multiply(n1, n2);
      logger.info('multiplication: n1 = '+n1+' and n2 = '+n2+' ,Result = '+result);
      res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
      logger.error(error.message);
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

app.get("/divide", (req, res) => {
  try {
      const n1 = parseFloat(req.query.n1);
      const n2 = parseFloat(req.query.n2);
      if (isNaN(n1)) {
          logger.error("n1 is incorrectly defined");
          throw new Error("n1 incorrectly defined");
      }
      if (isNaN(n2)) {
          logger.error("n2 is incorrectly defined");
          throw new Error("n2 incorrectly defined");
      }
      const result = divide(n1, n2);
      logger.info('division: n1 = '+n1+' and n2 = '+n2+' ,Result = '+result);
      res.status(200).json({ statuscode: 200, data: result });
  } catch (error) {
      logger.error(error.message);
      res.status(500).json({ statuscode: 500, msg: error.toString() });
  }
});

const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port"+port);
})

