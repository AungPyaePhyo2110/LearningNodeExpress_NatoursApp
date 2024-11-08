const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // middleware so that incoming string is like json

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };


  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id)
  const tour = tours.find(el => el.id === id)

  if(!tour){
    return res.status(404).json({
      status : "fail",
      message : "Invalid ID"
    })
  }

  res.status(200).json({
    status: 'success',
    data : {
      tour
    }
  });
});

app.patch("/api/v1/tours/:id" , (req,res) =>{
  const id = Number(req.params.id)
  const tour = tours.find(el => el.id === id)

  if(!tour){
    return res.status(404).json({
      status : "fail",
      message : "Invalid ID"
    })
  }

  res.status(200).json({
    status : "success",
    data : {
      tour : "Updated tour ..."
    }
  })
})

app.delete("/api/v1/tours/:id" , (req,res) =>{
  const id = Number(req.params.id)
  const tour = tours.find(el => el.id === id)

  if(!tour){
    return res.status(404).json({
      status : "fail",
      message : "Invalid ID"
    })
  }

  res.status(204).json({
    status : "success",
    data : null
  })
})


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});