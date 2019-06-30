import axios from 'axios'

const GETAPPLICATIONS_URL = 'http://localhost:8080/applications';

class GetApplicationsService {
    executeGetService() {
    let response = axios.get(GETAPPLICATIONS_URL );
    console.log("Made service call ; " + response.valueOf());

        return axios.get(GETAPPLICATIONS_URL );
    }
}

export default new GetApplicationsService()