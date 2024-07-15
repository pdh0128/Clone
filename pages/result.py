import streamlit as st
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db



ref = db.reference('')
ref.update({
     "score" : st.session_state.score
})
st.write(st.session_state.name + "님 점수:")

if st.button('결과 보기') :
    st.write(st.session_state.score)