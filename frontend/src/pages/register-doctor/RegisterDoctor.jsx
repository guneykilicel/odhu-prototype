import React from 'react'
import './registerDoctor.css';
import { useNavigate } from 'react-router-dom';

const RegisterDoctor = () => {


    const handleSubmit = async (e) => {
    }

    const navigate = useNavigate();

    const goLogin = (e) => {
        e.preventDefault();
        navigate("/login");
      }
    return (
        <div style={{backgroundColor: "#35c5cf", height: "100vh"}}>
            <div className="container" style={{marginTop: ".2rem", position: "fixed", top:"4%", left:"12%"}}>

                <form action="#" style={{borderRadius: "1rem", padding:"2rem", }} onSubmit={handleSubmit}>
                <header style={{marginBottom:"2rem"}}>ODHU Doktor Kayıt</header>
                    <div className="form first">
                        <div className="details personal">
                            {/* <!-- <span className="title">Kişisel Bilgiler</span> --> */}

                            <div className="fields">
                                <div className="input-field">
                                    <label>Ad</label>
                                    <input type="text" required />
                                </div>

                                <div className="input-field">
                                    <label>Soyad</label>
                                    <input type="text" required />
                                </div>

                                <div className="input-field">
                                    <label>Email</label>
                                    <input type="email" placeholder="ornek@gmail.com" required />
                                </div>

                                <div className="input-field">
                                    <label>Tel No</label>
                                    <input type="tel" placeholder="05xx xxx xxxx" required />
                                </div>

                                {/* <!-- <div className="input-field">
                            <label>Cinsiyet</label>
                            <select name="gender">
                                <option value="female">Erkek</option>
                                <option value="male">Kadın</option>
                            </select>
                        </div> -->

              <!-- <div className="input-field">
                            <label>Mezun Olunan Okul</label>
                            <input type="text" placeholder="Örn: Gazi Üniversitesi" required>
                        </div> --> */}

                                <div className="input-field">
                                    <label>İl</label>
                                    <input type="text" required />
                                </div>

                                <div className="input-field">
                                    <label>İlçe</label>
                                    <input type="text" required />
                                </div>

                                <div className="input-field">
                                    <label>Branş</label>
                                    <select name="branch" required>
                                        <option value="" selected disabled hidden>
                                            --Branş Seçiniz--
                                        </option>
                                        <option value="general">Genel Diş Hekimliği</option>
                                        <option value="orthodontist">Ortodontist</option>
                                        <option value="pedodontist">Pedodontist</option>
                                        <option value="oralSurgeon">Ağız Cerrahı</option>
                                        <option value="endodontist">Endodontist</option>
                                        <option value="periodontist">Periodontist</option>
                                        <option value="prosthodontist">Prostodontist</option>
                                    </select>
                                </div>

                                <div className="input-field">
                                    <label
                                    >Lütfen <b>diplomanızı</b> ve <b>CV</b>'nizi yükleyin.</label
                                    >
                                    <input type="file" required multiple />
                                </div>

                                <div style={{display: "flex", alignItems: "center"}}>
                                <button type='submit' className="submit">
                                    <span className="submit">Gönder</span>
                                    <i className="uil uil-navigator"></i>
                                </button>
                                <button onClick={goLogin}>Zaten bir hesabın var mı?</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default RegisterDoctor