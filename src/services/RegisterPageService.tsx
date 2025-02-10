import { AxiosResponse } from "axios";
import axios from "../config/axios";
import { UserType } from "../Types/Types";

class RegisterPageServices {
  register(newuser: UserType): Promise<UserType> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .post("/users", newuser)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}

export default new RegisterPageServices();
