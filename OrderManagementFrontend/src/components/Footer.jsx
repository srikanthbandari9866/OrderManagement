import { MDBFooter, MDBContainer, MDBCol, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import React from 'react';

export default function Footer() {
  return (
    <div style={{ marginTop: "20px" }}>
      <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
        <MDBContainer className='p-4 pb-0'>
          <section className=''>
            <p className='d-flex justify-content-center align-items-center'>
              <span className='me-3'>Register for free</span>
              {/* <MDBBtn type='button' outline color="light" rounded>
              Sign up!
            </MDBBtn> */}
            </p>
          </section>
        </MDBContainer>

        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2020 Copyright: Hexa-Order Management <br />
          <a className='text-white' href='https://hexaware.com/' target='_blank'>
            Hexa-Order Management
          </a>
        </div>
      </MDBFooter>
    </div>
  )
}