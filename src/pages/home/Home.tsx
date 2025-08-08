import type { ReactElement } from "react"
import { SearchBar } from "../../components/common/search-bar/Search-Bar"
import './styles.pcss'

export const Home = (): ReactElement => {
       return (
	       <section className="home">
		       <div className="home_content">
			       <div className="home_description">
				       <span className="home_subtitle">
					       Welcome to
				       </span>
				       <span className="home_title">
					       Concero Scan
				       </span>
			       </div>
				   <div className="home_search">
					   <SearchBar />
				   </div>
		       </div>
	       </section>
       )
}
