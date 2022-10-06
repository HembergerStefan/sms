import React from 'react';
import Dropdown from "../components/form/dropdown/Dropdown";

const Overview = () => {
    return (
        <div style={{height: '100%', width: '100%', background: 'var(--nl-clr-1)', padding: '40px', gridArea: 'main'}}>
            <span className='fs-pr-1 fw--semi-bold clr-pr-1'>This is a heading</span><br/>
            <span className='fs-pr-body-1 fw-regular clr-sc-1'>This is a Demo Text</span>

            <br/>
            <br/>

            <Dropdown/>
        </div>
    );
};

export default Overview;