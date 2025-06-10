import React from 'react';
import styles from './ContactPage.module.css';
import Header from '../../components/Header/header';
import Footer from '../HomePage/components/Footer';
import heroBg from '../../assets/images/hero-bg.png';
import pinIcon from '../../assets/images/pin.png';
import phoneIcon from '../../assets/images/phone.png';
import mailIcon from '../../assets/images/mail.png';
import clockIcon from '../../assets/images/clock.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ContactPage = () => {
    const position = [52.4064, 16.9252]; 

    return (
        <div className={styles.contactPage}>
            <Header />
            <section className={styles.heroSection} style={{ backgroundImage: `url(${heroBg})` }}>
                <div className={styles.heroOverlay}>
                    <h1>CONTACT US</h1>
                    <p>Ensuring your pets live their best lives.</p>
                </div>
            </section>
            <section className={styles.contactContent}>
                <div className={styles.contactDetails}>
                    <div className={styles.detailItem}>
                        <img src={pinIcon} alt="Address Pin Icon" className={styles.icon} />
                        <div>
                            <h3>Address:</h3>
                            <p>1234 Street Adress City Address, 1234</p>
                        </div>
                    </div>

                    <div className={styles.detailItem}>
                        <img src={phoneIcon} alt="Phone Icon" className={styles.icon} />
                        <div>
                            <h3>Phone:</h3>
                            <p>(123) 456 7890</p>
                        </div>
                    </div>
                    <div className={styles.detailItem}>
                        <img src={clockIcon} alt="Clock Icon" className={styles.icon} />
                        <div>
                            <h3>We are Open:</h3>
                            <p>Monday - Thursday: 9:00 AM - 5:30 PM</p>
                            <p>Friday: 9:00 AM - 6:00 PM</p>
                            <p>Saturday: 11:00 AM - 5:00 PM</p>
                        </div>
                    </div>

                    <div className={styles.detailItem}>
                        <img src={mailIcon} alt="Mail Icon" className={styles.icon} />
                        <div>
                            <h3>E-mail:</h3>
                            <p>hi.vetclinic@vetclinicpoznan.com</p>
                        </div>
                    </div>
                </div>
                <div className={styles.mapContainer}>
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className={styles.map}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                VetClinic Poznań <br /> 1234 Street Address.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactPage;