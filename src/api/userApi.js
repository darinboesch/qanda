import Transport from "../modules/Transport";

class UserApi {
  static loginUser(data) {
    return Transport.post("/api/login", data);
  }

  static registerUser(data) {
    return Transport.post("/api/register", data);
  }
}

export default UserApi;
