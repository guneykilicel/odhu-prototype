import React, { useContext, useEffect, useState } from 'react'
import RightBox from '../../components/rightBox/RightBox';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Post } from '../../components/post/Post';
import "./home.css";

const Home = () => {
  const [timelinePosts, setTimelinePosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("/posts/timeline/" + user._id);
      setTimelinePosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    getPosts();
  }, [user._id]);

  return (
    <div className="container">
      {/* {console.log(user)} */}
      <div className="welcome">
        <h1>Merhaba {user.username}</h1>
        <span>Hadi randevularına bakalım!</span>
        <div className='welcome-content'>
        <div className='appointments'>
          <div className='appointments-datepickers'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DateTimePicker', 'DateTimePicker', 'DateTimePicker']}
              >
                <DemoItem
                  // label={"Geçmiş Randevuların"}
                >
                  <span style={{color:"black"}}>Geçmiş Randevuların:</span>
                  <DateTimePicker
                    views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                    ampm={false}
                  />
                  
                </DemoItem>
                <DemoItem>
                  <span style={{color: "black"}}><span style={{color:"#21747a", fontWeight: "bold"}}>@admin</span> doktorundan aldığın randevu:</span>
                  <span style={{color: "black", fontSize:".7rem"}}>En fazla iki beklenen randevu alabilirsin!</span>
                  <DateTimePicker views={['day', 'hours']} ampm={false} />
                </DemoItem>
                <button className='cancel'>İptal Et</button>
                <DemoItem>
                <span style={{color: "black"}}><span style={{color:"#21747a", fontWeight: "bold"}}>@admin</span> doktorundan aldığın randevu:</span>
                  <span style={{color: "black", fontSize:".7rem"}}>En fazla iki beklenen randevu alabilirsin!</span>
                  <DateTimePicker views={['day', 'hours']} ampm={false} />
                </DemoItem>
                <button className='cancel'>İptal Et</button>
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        <div className="home-page-right">
          <RightBox />
        </div>
        </div>
      </div>
      <div className="home-page">
        <div className="home-page-left">
          <div className="posts">
            {timelinePosts.map((post) => (
              <Post top bottom key={post._id} post={post} />
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Home