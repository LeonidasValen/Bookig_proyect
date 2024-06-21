import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import './login.css'

export function Login() {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const { loading, error, dispatch } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        email: undefined,
        password: undefined
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post("http://localhost:8800/api/loginUser", formData)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/")
        } catch (err) {
            dispatch({type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }


    return (
        <section className='login'>
            <form className="lContainer" onSubmit={handleSubmit}>
                <h1>Sign in or create an account</h1>
                <label htmlFor="">Email address</label>
                <input type="text" placeholder='email' name='email' className="lInput" onChange={handleChange} />
                <label htmlFor="">Password</label>
                <input type="password" placeholder='password' name='password' className="lInput" onChange={handleChange} />
                <button className="lButton">Login</button>
                {error && <p className="field-error">{error.message}</p>}
            </form>
        </section>
    )
}
