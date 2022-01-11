const API_KEY = "db95ce0745a0cddc1fc60b85"
const getCurrencyURL = base_code => `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base_code}`

const fetchData = async url => {
    try {
        const response = await fetch(url)

        if(!response.ok) {
            throw new Error('Não foi possível obter os dados')
        }

        return response.json()
    } catch (e) {
        console.log(e);
    }
}

const getCurrencyData = base_code => fetchData(getCurrencyURL(base_code))
