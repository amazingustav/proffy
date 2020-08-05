import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://lh3.googleusercontent.com/faWGBDul8XMCxbNmMz_F5Af-4wXyqb7_r4a1DUkitpUHEtkXw2c9tGmf6BUER5qcKMIrWlDIuTj0ergdbK6SAJjeSm_Epv7VtMzOZdIQ7jN8-BUN4Eqh6pTyMDfYHbihR-MzPanAnoFksNxBPJOUrLDsKwTd47VtQPTM5jD4wSyFpB_hSU-0Kof05ctHRZJN0Va2vVOEOoqikPnq8yqiP1Arj21xTbdkb4mA_K4IT19C10Wi3VagIidOYJdncgBUtX596OVd_DOFw0OXpThCKKo5jBqHHWwxrJ76qXHJyolOR3F8Ldu6KMgZbT2zeo075M1izjLT_X0RmDo6oImKKugv4m2g9PRUvTX-aJBS6-HDiOrnJs2MMJ2hk-sRX8gtDc2OEtNsSiq10vxExfreBlgW4-jIX_7MtItFRN0Hb5N2_6emegYiJhlmfch9zGpSVoMbCEDn4yXSZ8RYxR2k2LcCuJuwY_gwLtAqc2p_doTwMA7ohrXhTn6_zbIDrHIAjZR5Pm4S3DceDeTZ-g4_9hjIjqrk3j4r1qBrdUvXxgMW1fOmoxADT0dJGy1pIiUj5E5N7gcon0HU0BoOTXWUWGWbgXQEIypZxSinXcSj3_Wf05qFa1VajdaS03aY4y7aWCGg2LJDjBU2I8Gp7OwuVIOSsXjnLapPnqlx6MSQUSXaOPbRyEaecEY1zdJuRaM=w300" alt="Gustavo Amorim"/>
        <div>
          <strong>Gustavo Amorim</strong>
          <span>Filosofia</span>
        </div>
      </header>

      <p>
        Uma mente complexa e simples ao mesmo tempo
        <br/><br/>
        Pensa de um jeito diferente, considera o pensar alheio e te faz pensar no que você não achava que seria capaz (?)
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ 1.000.000,00</strong>
        </p>

        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem