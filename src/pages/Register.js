import styled from "styled-components";
import { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: 
    url("https://firebasestorage.googleapis.com/v0/b/mern-project-images.appspot.com/o/e-commerce-registration.jpg?alt=media&token=bcd4fc42-ded6-4a30-b0c0-198da4390896")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Infomsg = styled.p`
  font-size: 16px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const BASE_URL = process.env.REACT_APP_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        firstname: firstname.current.value,
        lastname: lastname.current.value,
      };
      try {
        await axios.post(`${BASE_URL}auth/register`, user);
        navigate("/login");
        
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="name" ref={firstname} />
          <Input placeholder="last name" ref={lastname} />
          <Input placeholder="username"ref={username}  />
          <Input placeholder="email" ref={email} type="email" />
          <Input placeholder="password"ref={password}  type="password" />
          <Input placeholder="confirm password" ref={passwordAgain} type="password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button >CREATE</Button>
          <Infomsg>&nbsp;&nbsp;Already have an account? <Link to="/login"><b>Login</b></Link></Infomsg>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
