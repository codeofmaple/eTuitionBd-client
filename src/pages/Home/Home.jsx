import React from 'react';
import HowItWorks from '../../components/Home/HowItWorks';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import HeroSlider from '../../components/Home/HeroSlider';
import LatestTuitions from '../../components/Home/LatestTuitions';
import LatestTutors from '../../components/Home/LatestTutors';

const Home = () => {
    return (
        <div className='space-y-16 lg:space-y-24 mb-16'>
            <section className=''>
                <HeroSlider></HeroSlider>
            </section>
            <section>
                <LatestTuitions></LatestTuitions>
            </section>
            <section>
                <LatestTutors></LatestTutors>
            </section>
            <section>
                <HowItWorks></HowItWorks>
            </section>
            <section>
                <WhyChooseUs></WhyChooseUs>
            </section>
        </div>
    );
};

export default Home;