import styles from './Homepage.module.css'


export default function Homepage () {


  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.heading_container}>
          <h3 className={styles.heading_text}>Exchange your old books for new reads </h3>
          <p className={styles.subtext}>Earn credits buy selling unwanted books</p>
        </div>
        <div className={styles.image_container}>
          <img className={styles.main_image} src='https://images.unsplash.com/photo-1612477954469-c6a60de89802?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'></img>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.book_heading_container}>
          <h3 className={styles.featured_heading_text}>Featured Book</h3>
          <p className={styles.featured_subtext}>George Orwell - 1984</p>
        </div>
        <div className={styles.book}>
          <div className={styles.front}>
            <div className={styles.cover}>
              <p className={styles.num_up}>84</p>	
              <svg 
                id="eye-left"
                xmlns="http://www.w3.org/2000/svg"
                width="75" 
                height="100" 
                version="1.0">
                <path d="m 72.520861,60.915859 v 0 C 69.385207,53.011396 61.908243,46.570093 55.74346,42.387465 49.578631,38.204905 40.408101,36.818968 33.679899,37.051071 c -1.597953,0.05517 -2.931531,0.451253 -4.000736,1.188245 -0.738155,0.570053 -1.097854,1.127016 -1.079089,1.670881 0.02949,0.854739 0.93486,2.69053 2.716108,5.507379 0.805175,1.372521 1.234574,2.83577 1.288193,4.389751 0.131362,3.807345 -0.983571,6.879734 -3.344801,9.217182 -2.361227,2.337476 -5.686459,3.580206 -9.975699,3.728183 C 15.162859,62.894893 11.580282,61.559887 8.5361375,58.747669 5.4920363,55.935482 3.8975877,52.431474 3.7527937,48.235627 c -0.1769131,-5.1282 2.0835359,-9.776522 6.7813483,-13.944986 4.697855,-4.168379 11.041643,-6.390426 19.031387,-6.666142 8.662566,-0.298838 16.811229,2.201105 24.446015,7.499833 7.634738,5.298806 13.804506,13.895976 18.509317,25.791527 z" id="text2161" fill="#000" fillOpacity="1" stroke="none" strokeWidth=".72233355px" strokeLinecap="butt" strokeLinejoin="miter" strokeOpacity="1"/>
              </svg>
              <svg 
                id="eye-right"
                xmlns="http://www.w3.org/2000/svg"
                width="75" 
                height="100" 
                version="1.0">
                <path d="m 72.520861,60.915859 v 0 C 69.385207,53.011396 61.908243,46.570093 55.74346,42.387465 49.578631,38.204905 40.408101,36.818968 33.679899,37.051071 c -1.597953,0.05517 -2.931531,0.451253 -4.000736,1.188245 -0.738155,0.570053 -1.097854,1.127016 -1.079089,1.670881 0.02949,0.854739 0.93486,2.69053 2.716108,5.507379 0.805175,1.372521 1.234574,2.83577 1.288193,4.389751 0.131362,3.807345 -0.983571,6.879734 -3.344801,9.217182 -2.361227,2.337476 -5.686459,3.580206 -9.975699,3.728183 C 15.162859,62.894893 11.580282,61.559887 8.5361375,58.747669 5.4920363,55.935482 3.8975877,52.431474 3.7527937,48.235627 c -0.1769131,-5.1282 2.0835359,-9.776522 6.7813483,-13.944986 4.697855,-4.168379 11.041643,-6.390426 19.031387,-6.666142 8.662566,-0.298838 16.811229,2.201105 24.446015,7.499833 7.634738,5.298806 13.804506,13.895976 18.509317,25.791527 z" id="text2161" fill="#000" fillOpacity="1" stroke="none" strokeWidth=".72233355px" strokeLinecap="butt" strokeLinejoin="miter" strokeOpacity="1"/>
              </svg>
              <p className={styles.num_down}>1</p>
              <p className={styles.author}>George Orwell</p>
            </div>
          </div>
          <div className={styles.left_side}>
            <h2>
              <span>George Orwell</span>
              <span>1984</span>
            </h2>
          </div>
        </div>
        <div className={styles.book_description_container}>
          <div className={styles.book_description_text}>
            <p>Nineteen Eighty-Four (also stylised as 1984) is a dystopian social science fiction novel and cautionary tale written by the English writer George Orwell. It was published on 8 June 1949 by Secker and Warburg as Orwells ninth and final book completed in his lifetime. Thematically, it centres on the consequences of totalitarianism, mass surveillance and repressive regimentation of people and behaviours within society. Orwell, a democratic socialist, modelled the totalitarian government in the novel after Stalinist Russia and Nazi Germany. More broadly, the novel examines the role of truth and facts within politics and the ways in which they are manipulated.</p>
          </div>
        </div>

      </div>
    </>
  )
}