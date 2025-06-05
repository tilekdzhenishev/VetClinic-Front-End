import React from 'react';
import styles from './Benefits.module.css';
import benefitsImage from '../../../assets/benefits-block.png';

const Benefits = () => {
  return (
    <section className={styles.benefitsSection}>
           {" "}
      <div className={styles.container}>
               {" "}
        <div className={styles.benefitsImageContainer}>
                   {" "}
          <img
            src={benefitsImage}
            alt="Our Key Benefits"
            className={styles.benefitsImage}
          />
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </section>
  );
};

export default Benefits;
