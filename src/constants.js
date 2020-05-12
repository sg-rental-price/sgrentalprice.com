
const BUILD_BRANCH = process.env.REACT_APP_BUILD_BRANCH || 'master'
const ENDPOINT = ({
  master: 'dev',
  staging: 'staging',
  production: 'limited-public'
})[BUILD_BRANCH]

export const API_URL = `https://06f2biaxm9.execute-api.ap-southeast-1.amazonaws.com/${ENDPOINT}`