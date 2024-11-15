import { ROLE_HIERARCHY } from "../config/roles";
import { ForbiddenError, NotAuthorizeError } from "../utils/errors";

export default function acl(roleName) {
  return (req, res, next) => {
    if (!req.user) {
      throw new NotAuthorizeError();
    }

    const { role } = req.user;

    console.log(role);

    if (role === roleName || ROLE_HIERARCHY[role]?.includes(roleName)) {
      return next();
    }

    throw new ForbiddenError();
  };
}
