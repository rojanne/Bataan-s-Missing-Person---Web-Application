import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react';
import FemaleOnly from './female';

const Filter = () => {

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Filter by
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href='/female-only'>Female</Dropdown.Item>
                <Dropdown.Item as="button">Male</Dropdown.Item>
                <Dropdown.Item >
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Municipality
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-3">Abucay</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Limay</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Balnaga</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Filter;