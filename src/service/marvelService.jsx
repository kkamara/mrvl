import axios from 'axios'
import md5 from 'md5'
import API from './api'
import { 
    PRIVATE_MARVEL_KEY, 
    PUBLIC_MARVEL_KEY,
    MARVEL_URL,
} from '../constants'

export default class MarvelService extends API {
    /**
     * Call base class construct.
     * @param {any=} http - Optional http to override default assignment
     * @return {void}
     */
    constructor(http=null) {
        super(http)
        const url = new URL(MARVEL_URL + '/public/comics')
        const urlParams = this.generateKeys()

        for (let key in urlParams) {
            const val = urlParams[key]
            switch(key) {
                case 'apiKey':
                    key = 'apikey'
                default:
                    break
            }
            url.searchParams.append(key, val)
        }
        
        axios.get(url, { headers: { Accept: 'application/json', },})
            .then(res => {
                console.log(res.data.data)
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    }

    /**
     * @return {string[]}
     */
    generateKeys() {
        const results = { apiKey: PUBLIC_MARVEL_KEY, ts: (new Date()).getTime(), }
        results.hash = md5(results.ts+PRIVATE_MARVEL_KEY+PUBLIC_MARVEL_KEY)
        return results
    }

    /**
     * Return a single character api response
     * @param  {number} id
     * @return {string|boolean}
     */
    getCharacter(id) {
        /** @var {string} endpoint */
        const endpoint = `${this._url}/character/${id}`
        return axios.get(endpoint)
    }

    /**
     * Return characters api response     *
     * @param  {number=} page (optional)
     * @return {string|boolean}
     */
    getChars(page=null) {
        page = null !== page && null !== `${page}`.match(/^\d+$/)
            ? Number.parseInt(page)
            : 1

        /** @var {string} endpoint */
        let endpoint = `${this._url}/character`
        if (page) endpoint += `/?page=${page}`

        return axios.get(endpoint)
    }

    /**
     * Search through character results.
     * @param  {string} uriEncodedFilters - Store filter values provided in request
     * @param  {number=} page (optional)
     * @return {string|boolean}
     */
    search(uriEncodedFilters, page) {
        if (1 > uriEncodedFilters.length) return new Promise(resolve => resolve(false))

        page = null !== page && null !== `${page}`.match(/^\d+$/)
            ? Number.parseInt(page)
            : 1

        /** @var {string} endpoint */
        const endpoint = `${this._url}/character/?page=${page}&${uriEncodedFilters}`
        return axios.get(endpoint)
    }

    /**
     * Get URI encoded string from given array
     * @param  {array} fields - Array containing field values
     * @return {string}
     */
    uriEncodeArray(fields) {
        /**
         * Default return value
         * @var {string} result
         */
        let result = ''
        /**
         * Maintain iteration count for given array
         * @var {int} count
         */
        let count = 0
        for (const name in fields) {
            const value = fields[name]
            if(null === value) continue
            result += count === 0
                ? `${name}=${value}`
                : `&${name}=${value}`
            ++count
        }

        return result
    }

    /**
     * Validate search input fields.
     * @param  object - input values for querying R&M characters
     * @return {array|false}
     */
    validateSearchParams({ name, status, species, type, gender }) {
        const result = []

        if (name && 255 <= name.length) {
            result["name"] = "The name exceeds 255 character limit."
        }

        /** @var {array} statuses */
        const statuses = ['alive', 'dead', 'unknown']
        if (status) {
            if (255 <= status.length) {
                result["status"] = "The status exceeds 255 character limit."
            } else if (!status.includes(statuses)) {
                result["status"] = `The status must be one of ${statuses.join(', ')}.`
            }
        }

        if (species && 255 <= species.length) {
            result["species"] = "The species exceeds 255 character limit."
        }

        if (type && 255 <= type.length) {
            result["type"] = "The type exceeds 255 character limit."
        }

        /** @var {array} genderOptions */
        const genderOptions = ['female', 'male', 'genderless', 'unknown']
        if (gender) {
            if (255 <= gender.length) {
                result["gender"] = "The gender exceeds 255 character limit."
            } else if (!gender.includes(genderOptions)) {
                result["gender"] = `The gender must be one of ${genderOptions.join(', ')}.`
            }
        }

        return result.length ? result : false
    }
}
