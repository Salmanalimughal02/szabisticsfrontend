const jwt = require("jsonwebtoken");

const ServerErrorResponse = require("../utils/classes/ServerErrorResponse");
const {
  STATUS_CODE,
  STATUS_MESSAGES,
  ACCOUNT_STATUS,
} = require("../constants/Status");
const { ERROR_MESSAGES, UNAUTHORIZE_MESSAGES } = require("../constants/Errors");
const { ROLES } = require("../constants/Roles");

const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  //getting token and check is it there

  try {
    // Bearer jhkhkhkhkhkhkjhkh
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        res
          .status(STATUS_CODE.UNAUTHORIZED)
          .json(
            ServerErrorResponse.customError(
              STATUS_MESSAGES.ERROR,
              STATUS_CODE.UNAUTHORIZED,
              UNAUTHORIZE_MESSAGES.NOT_LOGGED_IN,
              null
            )
          )
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const currentUser = await User.findById(decoded.userId);

    if (!currentUser) {
      return next(
        res
          .status(STATUS_CODE.UNAUTHORIZED)
          .json(
            ServerErrorResponse.customError(
              STATUS_MESSAGES.ERROR,
              STATUS_CODE.UNAUTHORIZED,
              ERROR_MESSAGES.NOT_FOUND,
              null
            )
          )
      );
    }
    req.user = currentUser;
    next();
  } catch (error) {
    const obj = {
      expired: true,
    };
    return next(
      res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.ERROR,
            STATUS_CODE.UNAUTHORIZED,
            UNAUTHORIZE_MESSAGES.EXPIRED_JWT,
            obj
          )
        )
    );
  }
};

const validateIsDriver = async (req, res, next) => {
  try {
    const currentUser = req.user;

    if (currentUser && currentUser.role === ROLES.DRIVER) {
      req.driver = currentUser;
      next();
    } else {
      return next(
        res
          .status(STATUS_CODE.ACCESS_DENIED)
          .json(
            ServerErrorResponse.customError(
              STATUS_MESSAGES.ERROR,
              STATUS_CODE.ACCESS_DENIED,
              ERROR_MESSAGES.ENDPOINT_ACCESS_DENIED(
                ROLES.DRIVER.toLocaleLowerCase()
              ),
              null
            )
          )
      );
    }
  } catch (error) {
    const errorResponseData = {
      error,
    };
    return next(
      res
        .status(STATUS_CODE.ACCESS_DENIED)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.ERROR,
            STATUS_CODE.ACCESS_DENIED,
            UNAUTHORIZE_MESSAGES.ENDPOINT_ACCESS_DENIED(
              ROLES.SELLER.toLocaleLowerCase()
            ),
            errorResponseData
          )
        )
    );
  }
};

const validateIsOwner = async (req, res, next) => {
  try {
    const currentUser = req.user;

    if (currentUser && currentUser.role === ROLES.OWNER) {
      req.owner = currentUser;
      next();
    } else {
      return next(
        res
          .status(STATUS_CODE.ACCESS_DENIED)
          .json(
            ServerErrorResponse.customError(
              STATUS_MESSAGES.ERROR,
              STATUS_CODE.ACCESS_DENIED,
              ERROR_MESSAGES.ENDPOINT_ACCESS_DENIED(
                ROLES.OWNER.toLocaleLowerCase()
              ),
              null
            )
          )
      );
    }
  } catch (error) {
    const errorResponseData = {
      error,
    };
    return next(
      res
        .status(STATUS_CODE.ACCESS_DENIED)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.ERROR,
            STATUS_CODE.ACCESS_DENIED,
            UNAUTHORIZE_MESSAGES.ENDPOINT_ACCESS_DENIED(
              ROLES.FARMER.toLocaleLowerCase()
            ),
            errorResponseData
          )
        )
    );
  }
};

const validateIsAdmin = async (req, res, next) => {
  try {
    const currentUser = req.user;

    if (currentUser && currentUser.role === ROLES.SUPER_ADMIN) {
      req.admin = currentUser;
      next();
    } else {
      return next(
        res
          .status(STATUS_CODE.ACCESS_DENIED)
          .json(
            ServerErrorResponse.customError(
              STATUS_MESSAGES.ERROR,
              STATUS_CODE.ACCESS_DENIED,
              ERROR_MESSAGES.ENDPOINT_ACCESS_DENIED(
                ROLES.OWNER.toLocaleLowerCase()
              ),
              null
            )
          )
      );
    }
  } catch (error) {
    const errorResponseData = {
      error,
    };
    return next(
      res
        .status(STATUS_CODE.ACCESS_DENIED)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.ERROR,
            STATUS_CODE.ACCESS_DENIED,
            UNAUTHORIZE_MESSAGES.ENDPOINT_ACCESS_DENIED(
              ROLES.FARMER.toLocaleLowerCase()
            ),
            errorResponseData
          )
        )
    );
  }
};

module.exports = {
  authenticateUser,
  validateIsDriver,
  validateIsOwner,
  validateIsAdmin,
};
