import React from 'react';
import HowItWorks from '../../components/Home/HowItWorks';
import WhyChooseUs from '../../components/Home/WhyChooseUs';

const Home = () => {
    return (
        <div>
            this is home page


            <section className=''>
                <HowItWorks></HowItWorks>
            </section>
            <section>
                <WhyChooseUs></WhyChooseUs>
            </section>
        </div>
    );
};

export default Home;