import axios from 'axios'

const GETFEATURES_URL = 'http://localhost:8080/features';

class GetFeaturesService {

    executeGetService(appid) {
        // var endpoint = GETFEATURES_URL + "/" + appid.toString();

        // return fetch(endpoint);
        return axios.get(GETFEATURES_URL + "/" + appid.toString());
    }
}

export default new GetFeaturesService()