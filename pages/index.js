import React from 'react'

import Login from "../components/Auth/Login"
import OrgSearch from '../components/TenantOrg/OrgSearch'
import Layout from '../components/Layout/Layout'

import {CircularProgress} from '@material-ui/core'


import { useFetchUser } from '../lib/user'
import { withApollo } from '../lib/withApollo'

const IndexPage = () => { 
  const { user, loading } = useFetchUser({required: true})

  if (!loading && !user) {
    return <Login />
  }
  if (loading) {
    return <CircularProgress />
  }
  return(
    <Layout>
      <OrgSearch />
    </Layout>
  )
}

export default withApollo({ ssr: true })(IndexPage)