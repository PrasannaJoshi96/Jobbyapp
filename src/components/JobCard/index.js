import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp, IoBagRemoveSharp} from 'react-icons/io5'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="jobcard-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="title-star-container">
            <h1 className="title">{title}</h1>
            <div className="star-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employment-type-container">
          <div className="location-container">
            <IoLocationSharp className="location-icon" />
            <p>{location}</p>
          </div>
          <div className="employment-type-container">
            <IoBagRemoveSharp className="bag-icon" />
            <p>{employmentType}</p>
          </div>

          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description-heading">Description</h1>
        <p className="job-descriptions">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobCard
