import {Fragment} from "react"
import Footer from '../components/core/Footer';
import Header from '../components/core/Header';

export const AppLayout = ({children, Wrapper = Fragment}) => {
    return (
        <Wrapper>
            <Header/>
            {children}
            <Footer/>
        </Wrapper>
    )
}