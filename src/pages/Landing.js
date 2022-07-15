import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
            iusto, cum, culpa, eum nihil autem eos minus est enim nemo
            voluptates vitae iste nostrum laboriosam repudiandae facere cumque
            deserunt vel.
          </p>
          <button className='btn btn-hero'>Login / Register</button>
        </div>
        <img src={main} alt='job hubt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
