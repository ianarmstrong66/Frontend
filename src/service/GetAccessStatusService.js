import axios from 'axios'

const GETACCESS_URL = 'http://localhost:8080/access';

class GetAccessStatusService {

    executeGetService(userid, access) {
        // console.log("user; "+ userid+" access: " + access);
        return axios.get(GETACCESS_URL + "/" + userid + "/" + access);
    }

}

export default new GetAccessStatusService()