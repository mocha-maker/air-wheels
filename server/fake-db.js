const Rental = require("./models/rentalModel");
const User = require("./models/userModel");
const Booking = require("./models/bookingModel");

class FakeDb {
  constructor() {
    this.rentals = [
      {
        title: "Inmotion V8S",
        city: "New York, NY",
        country: "USA",
        category: "Suspension Wheel",
        battery: "728Wh",
        wheelDiameter: "18 inches",
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
        wheelDiameter: "14 inches",
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
        wheelDiameter: "16 inches",
        range: "25-30 mi",
        speed: 31,
        weight: 48.5,
        dailyRate: 60,
        image: "http://via.placeholder.com/350x250",
      },
    ];

    this.users = [
      {
        name: "testUser",
        email: "test@email.com",
        password: "Password1",
      },
      {
        name: "testUser2",
        email: "test2@email.com",
        password: "Password",
      },
    ];
  }

  pushDataToDb() {
    const user = new User(this.users[0]);

    this.rentals.map((rental) => {
      const newRental = new Rental(rental);

      // set user as each rental user
      newRental.user = user._id;
      console.log(newRental);
      user.rentals.push(newRental._id);

      // save rental
      newRental.save();
      console.log("Saved" + newRental);
    });

    user.save();
    new User(this.users[1]).save();
  }

  async cleanDb() {
    await Booking.deleteMany({});
    await Rental.deleteMany({});
    await User.deleteMany({});
  }

  async seedDB() {
    await this.cleanDb();
    console.log("Seeding Database");
    this.pushDataToDb();
  }
}

module.exports = FakeDb;
