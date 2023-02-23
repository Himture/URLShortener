import { GraphQLClient, gql } from 'graphql-request'
import { remToken, setToken } from './auth'

const endpoint = 'http://127.0.0.1:8787'
const token = localStorage.getItem('Oslash')
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
})

export async function allUserURL(username: string) {
  const query = gql`{
    allUserURL(username: "${username}") {
      links {
        username
        tag
        sLink
        oLink
      }
      message
    }
  }`
  const data = await graphQLClient.request(query)
  return data.allUserURL
}

export async function getURL(sLink: string) {
  const query = gql`{
    getURL(sLink: "${sLink}") {
      links {
        oLink
        sLink
      }
      message
    }
  }`
  const data = await graphQLClient.request(query)
  return data.getURL
}

export async function addUrl(oLink:string, sLink: string) {
  const query = gql`mutation{
    addUrl(oLink:"${oLink}", sLink:"${sLink}"){
      message
    }
  }`
  const data = await graphQLClient.request(query)
  return data.addUrl.message
}

export async function addTag(sLink: string) {
  const query = gql`mutation{
    addTag(sLink:"${sLink}"){
      message
    }
  }`
  const data = await graphQLClient.request(query)
  return data.addTag.message
}

export async function updateUrl(sLink: string, oLink:string) {
  const query = gql`mutation{
    updateUrl(sLink:"${sLink}", oLink:"${oLink}"){
      message
    }
  }`
  const data = await graphQLClient.request(query)
  return data.updateUrl.message
}

export async function deleteUrl(sLink: string) {
  const query = gql`mutation{
    deleteUrl(sLink:"${sLink}"){
      insertId,
      message
    }
  }`
  const data = await graphQLClient.request(query)
  return data.deleteUrl.message
}

export async function login(email: string, password: string) {
  const query = gql`mutation{
    login(email:"${email}", password:"${password}")
  }`
  const data = await graphQLClient.request(query)
  if(data.login.length > 50 ) {
  setToken(data.login) }
  return data.login
}

export async function signup(email: string, password: string, username: string) {
  const query = gql`mutation{
    signup(email:"${email}", password:"${password}", username:"${username}")
  }`
  const data = await graphQLClient.request(query)
  return data.signup
}

export async function confirmUser(username: string, code: string) {
  const query = gql`mutation{
    confirmUser(username:"${username}", code:"${code}")
  }`
  const data = await graphQLClient.request(query)
  return data.confirmUser
}

export async function logout(idToken: string) {
  const query = gql`mutation{
    logout(idToken:"${token}")
  }`
  const data = await graphQLClient.request(query)
  remToken()
  return data.logout
}