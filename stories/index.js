import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import CompanyScore from '../src/Components/CompanyScore'
import RecommendCredit from '../src/Components/RecommendCredit'
import reportData from './MockData/reportData'
import '../src/Components/css/fonts.css'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;


storiesOf('Components', module)
    .add('Company Score', () => (
        <CompanyScore width={window.innerWidth} report={reportData} />
    ))
    .add('Recommend Credit', () => (
        <RecommendCredit width={window.innerWidth} report={reportData} />
    ))
    .add('with some emoji', () => (
        <Button onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
    ));