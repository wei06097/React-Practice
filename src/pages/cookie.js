import Cookies from 'universal-cookie'
import {API_CHECK} from '../constant'

const cookies = new Cookies()
export const set = (token) => cookies.set('token', token, {path: '/'})
export const get = () => cookies.get('token')
export const remove = () => cookies.remove('token')

export async function checkUser() {
    if (!get()) return Promise.reject()
    const res = await fetch(API_CHECK, {
        method: "GET",
        headers: {token: get()}
    })
    if (res.status === 403) return Promise.reject()
    return Promise.resolve(await res.json())
}