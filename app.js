const currencyOne = document.querySelector('[data-js="currency-one"]')
const currencyTwo = document.querySelector('[data-js="currency-two"]')
const currencyOneTimes = document.querySelector('[data-js="currency-one-times"]')
const convertedValue = document.querySelector('[data-js="converted-value"]')
const conversionPrecision = document.querySelector('[data-js="conversion-precision"]')

const logConversionResult = (times, conversionResult) => {
  const { text: currencyOneText } = currencyOne[currencyOne.selectedIndex]
  const { text: currencyTwoText } = currencyTwo[currencyTwo.selectedIndex]

  convertedValue.textContent = `${conversionResult.toFixed(2)}`
  conversionPrecision.textContent =
    `${times} ${currencyOneText} = ${conversionResult} ${currencyTwoText}`
}

const makeConversion = () => {
  const { value: times } = currencyOneTimes
  const { value } = currencyTwo[currencyTwo.selectedIndex]
  const conversionResult = value * times

  logConversionResult(times, conversionResult)
}

const setDefaultCurrencyTwoValue = () => {
  const baseCodeTwo = sessionStorage.getItem('currency-two') || 'BRL'
  Array.from(currencyTwo)
    .find(({ text }) => text === baseCodeTwo)
    .selected = true
}

const makeOptionElement = (acc, [key, value]) =>
  acc + `<option value=${value}>${key}</option>`

const fillCurrencyOptions = rates => {
  const currencyOptions = rates.reduce(makeOptionElement, '')

  currencyOne.innerHTML = currencyOptions
  currencyTwo.innerHTML = currencyOptions
}

const loadCurrencies = async base_code => {
  const { conversion_rates } = await getCurrencyData(base_code)
  const rates = Object.entries(conversion_rates)

  fillCurrencyOptions(rates)
  setDefaultCurrencyTwoValue()
  makeConversion()
}

const convertFrom =  e => {
  const base_code = e.target[e.target.selectedIndex].text
  loadCurrencies(base_code)
}

const convertTo = e => {
  const base_code = e.target[e.target.selectedIndex].text
  sessionStorage.setItem('currency-two', base_code)
  makeConversion()
}

currencyOne.addEventListener('change', convertFrom)
currencyTwo.addEventListener('change', convertTo)
currencyOneTimes.addEventListener('input', makeConversion)

loadCurrencies('USD')
