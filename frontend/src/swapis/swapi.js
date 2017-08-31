import React from 'react'

import PageHeader from '../template/pageHeader'
import SwapiForm from './swapiForm'
import SwapiList from './swapiList'

export default props => (
    <div>
        <PageHeader name='Swapis' small='Cadastro'></PageHeader>
        <SwapiForm />
        <SwapiList />
    </div>
)