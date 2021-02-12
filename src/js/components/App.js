import CarNameInput from './CarNameInput.js';
import TryCountInput from './TryCountInput.js';
import RacingResult from './RacingResult.js';
import RacingWinner from './RacingWinner.js';
import Car from '../model/Car.js';
import { MIN_NUMBER, MAX_NUMBER, MOVE_BOUNDED_NUMBER } from '../util/constant.js';
import { getRandomNumber } from '../util/general.js';

export default class App {
  constructor() {
    this.$app = document.querySelector('#app');
    this.carNames = [];
    this.tryCount = 0;
    this.cars = [];

    this.carNameInput = new CarNameInput({
      setCarNames: this.setCarNames.bind(this),
    });
    this.tryCountInput = new TryCountInput({
      setTryCount: this.setTryCount.bind(this),
    });
    this.racingResult = new RacingResult({
      $parent: this.$app,
      cars: this.cars,
    });
    this.racingWinner = new RacingWinner({
      $parent: this.$app,
      resetRacingGame: this.resetRacingGame.bind(this),
    });
  }

  setCarNames(nextCarNames) {
    this.setState({ nextCarNames });
  }

  setTryCount(nextTryCount) {
    this.setState({ nextTryCount });
  }

  createCars() {
    return this.carNames.map((carName) => new Car(carName));
  }

  play() {
    this.cars.forEach((car) => {
      for (let i = 0; i < this.tryCount; i++) {
        if (getRandomNumber({ min: MIN_NUMBER, max: MAX_NUMBER }) >= MOVE_BOUNDED_NUMBER) {
          car.move();
        }
      }
    });
  }

  getWinners() {
    const scores = this.cars.map((car) => car.score);
    const maxScore = Math.max(...scores);

    return this.cars.filter((car) => car.score === maxScore).map((car) => car.name);
  }

  resetRacingGame() {
    this.setState({ nextCarNames: [], nextTryCount: 0, nextCars: [] });
    this.carNameInput.resetElements();
    this.tryCountInput.resetElements();
  }

  setState({ nextCarNames, nextTryCount, nextCars }) {
    if (nextCarNames) {
      this.carNames = nextCarNames;
    }

    if (typeof nextTryCount === 'number') {
      this.tryCount = nextTryCount;
    }

    if (nextCars) {
      this.cars = nextCars;
      this.racingResult.setState({ nextCars });
    }

    if (this.carNames.length && this.tryCount > 0) {
      this.cars = this.createCars();
      this.play();
      this.racingResult.setState({ nextCars: this.cars });
      this.racingWinner.setState({ nextWinners: this.getWinners() });
    }
  }
}
