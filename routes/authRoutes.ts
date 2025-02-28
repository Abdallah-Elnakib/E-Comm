import express, { Router } from 'express';
import { loginUser } from '../controllers/authLoginControllers';
import { signupUser } from '../controllers/authSignupController';
import {getUserById} from '../controllers/authGetUserByIdControllers'
import {getAllAddress} from '../controllers/authGetAllAddressController'
import {deleteAddressById} from '../controllers/authDeleteAddressByAddressNumberControllers'
import {addNewAddress} from '../controllers/authAddNewAddressController'
import {updateAddress } from '../controllers/authUpdateAddressByIdControllers';
import {logout} from '../controllers/authLogoutControllers'

const router: Router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser)
router.get('/logout', logout)

router.get("/user/:id", getUserById)

router.get("/address/get-all/:user_id", getAllAddress)
router.delete('/address/delete/:user_id', deleteAddressById)
router.post('/address/add-address/:user_id', addNewAddress)
router.put('/address/update-address/:user_id', updateAddress)


export default router;