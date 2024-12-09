import {useState} from 'react';
import styles from './Demo.module.css';
import { SVGS, COMPANIES } from '../../utils/constants';
const Demo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (searchEvent) => {
    searchEvent.preventDefault();
    setShowResults(searchTerm.length > 0);
  };

  const handleInputChange = (inputChangeEvent) => {
    const value = inputChangeEvent.target.value;
    setSearchTerm(value);
    if(!value){
      setShowResults(false);
    }
  }

  const filteredCompanies = COMPANIES.filter(company =>
    company.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.apiContainer}>
      <div className={styles.apiContent}>
        <h1>See API In Action</h1>
        <p>
          Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
        </p>
      </div>
      <div className={`${styles.searchBox} ${showResults ? styles.expanded : ''}`}>
        <div className={styles.searchContent}>
          <form 
            onSubmit={handleSearch} 
            className={`${styles.searchInputContainer} ${showResults ? styles.hasResults : ''}`}
          >
            <input 
              type="text" 
              placeholder="Search" 
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button type="submit" className={styles.searchButton}>
              <img src={SVGS.searchIcon} alt="Search" />
            </button>
          </form>
          <div className={`${styles.resultsContainer} ${showResults && searchTerm ? styles.show : ''}`}>
            {filteredCompanies.map((company, index) => (
              <div 
                key={company.id} 
                className={`${styles.resultItem} ${showResults && searchTerm ? styles.show : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <img src={company.logo} alt={`${company.name} Logo`} />
                <span>{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <img src={SVGS.curvedArrow} alt="curved-arrow" className={styles.curvedArrow} width="336" height="323" />
    </div>
  );
};

export default Demo;