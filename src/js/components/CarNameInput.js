import { resetInput, disableElements, activateElements } from '../util/domUtil.js';
import { ERROR_MESSAGE } from '../util/errorMessage.js';
import { CAR_NAME_MAX_LENGTH, CAR_NAME_SEPARATOR } from '../util/constant.js';

export default class CarNameInput {
  constructor({ setCarNames }) {
    this.$target = document.querySelector('.car-name-input-containter');
    this.$carNameInput = this.$target.querySelector('input[type=text]');
    this.$carNameSummitBtn = this.$target.querySelector('button');
    this.setCarNames = setCarNames;

    this.bindEvents();
  }

  bindEvents() {
    this.$carNameSummitBtn.addEventListener('click', this.handleSubmitCarName.bind(this));
  }

  handleSubmitCarName() {
    const inputCarName = this.$carNameInput.value;
    const carNames = inputCarName.split(CAR_NAME_SEPARATOR).map((name) => name.trim());
    const errorMessage = this.checkValidInput({ inputCarName, carNames });

    if (errorMessage) {
      alert(errorMessage);
      resetInput(this.$carNameInput);
      return;
    }

    disableElements(this.$carNameInput, this.$carNameSummitBtn);
    this.setCarNames(carNames);
  }

  resetElements() {
    activateElements(this.$carNameInput, this.$carNameSummitBtn);
    resetInput(this.$carNameInput);
  }

  checkValidInput({ inputCarName, carNames }) {
    if (this.isEmptyCarName(inputCarName.trim())) {
      return ERROR_MESSAGE.EMPTY_CAR_NAME_INPUT;
    }

    if (this.isOneCarName(carNames)) {
      return ERROR_MESSAGE.ONE_CAR_NAME_INPUT;
    }

    if (this.isContainEmptyString(carNames)) {
      return ERROR_MESSAGE.EMPTY_STRING_CAR_NAME_INPUT;
    }

    if (this.isDuplicatedCarName(carNames)) {
      return ERROR_MESSAGE.DUPLICATED_CAR_NAME_INPUT;
    }

    if (this.isOverMaxLengthCarName(carNames)) {
      return ERROR_MESSAGE.OVER_MAX_LENGTH_CAR_NAME_INPUT;
    }

    return '';
  }

  isEmptyCarName(inputCarName) {
    return inputCarName === '';
  }

  isOneCarName(carNames) {
    return carNames.length < 2;
  }

  isContainEmptyString(carNames) {
    return carNames.some((carName) => this.isEmptyCarName(carName));
  }

  isDuplicatedCarName(carNames) {
    return carNames.length !== new Set(carNames).size;
  }

  isOverMaxLengthCarName(carNames) {
    return carNames.some((carName) => carName.length > CAR_NAME_MAX_LENGTH);
  }
}
