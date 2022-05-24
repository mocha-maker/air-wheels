const Rental = require("./models/rentalModel");

class FakeDb {
  constructor() {
    this.rentals = [
      {
        title: "Inmotion V8S",
        city: "New York, NY",
        country: "USA",
        category: "Suspension Wheel",
        battery: "728Wh",
        motor: "1000W",
        range: "38 mi",
        speed: 21.7,
        weight: 33,
        dailyRate: 50,
        image: "http://via.placeholder.com/350x250",
      },
      {
        title: "MTen3",
        city: "Los Angeles, CA",
        country: "USA",
        category: "Portable Wheel",
        battery: "512Wh",
        motor: "800W",
        range: "25-30 mi",
        speed: 23,
        weight: 22,
        dailyRate: 30,
        image: "http://via.placeholder.com/350x250",
      },
      {
        title: "Begode Tesla V3",
        city: "Toronto, ON",
        country: "Canada",
        category: "Advanced Wheel",
        battery: "1500Wh",
        motor: "2000W",
        range: "25-30 mi",
        speed: 31,
        weight: 48.5,
        dailyRate: 60,
        image: "http://via.placeholder.com/350x250",
      },
    ];
  }

  pushRentalsToDb() {
    this.rentals.map((rental) => {
      const newRental = new Rental(rental);
      console.log(newRental);
      newRental.save();
    });
  }

  seedDB() {
    console.log("Seeding Database");
    this.pushRentalsToDb();
  }
}

module.exports = FakeDb;
