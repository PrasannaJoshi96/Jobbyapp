import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FilterGroup from '../FilterGroup'
import JobCard from '../JobCard'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileApiStatus: apiConstants.initial,
    profileData: {},
    jobsApiStatus: apiConstants.initial,
    jobsList: [],
    input: '',
    employmentType: '',
    minPackage: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    this.setState({profileApiStatus: apiConstants.inProgress})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)
    const fetchedProfileData = await response.json()
    if (response.ok === true) {
      const profile = fetchedProfileData.profile_details
      const profileData = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      this.setState({profileData, profileApiStatus: apiConstants.success})
    } else {
      this.setState({profileApiStatus: apiConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button className="retry-button">Retry</button>
    </div>
  )

  renderProfileView = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiConstants.inProgress:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderProfileSuccessView()
      case apiConstants.failure:
        return this.renderProfileFailureView()

      default:
        return null
    }
  }

  getJobsData = async () => {
    const {input, employmentType, minPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    this.setState({jobsApiStatus: apiConstants.inProgress})

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${input}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    const fetchedJobsData = await response.json()

    if (response.ok === true) {
      const jobsData = fetchedJobsData.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
        employmentType: eachJob.employment_type,
      }))
      this.setState({jobsApiStatus: apiConstants.success, jobsList: jobsData})
    } else {
      this.setState({jobsApiStatus: apiConstants.failure})
    }
  }

  changeEmployment = employmentType => {
    this.setState({employmentType}, this.getJobsData)
  }

  changeSalary = minPackage => {
    this.setState({minPackage}, this.getJobsData)
  }

  onChangeSearchInput = event => {
    this.setState({input: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsData()
  }

  noJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-paragraph">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobSuceessView = () => {
    const {jobsList} = this.state
    const isShowJobsList = jobsList.length > 0
    return isShowJobsList ? (
      <ul>
        {jobsList.map(eachItem => (
          <JobCard jobDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      this.noJobsView()
    )
  }

  renderJobs = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiConstants.inProgress:
        return this.renderLoadingView()

      case apiConstants.success:
        return this.renderJobSuceessView()
      case apiConstants.failure:
        return this.renderJobsFailureView()

      default:
        return null
    }
  }

  render() {
    const {input} = this.state

    return (
      <div className="jobs-content-main-container">
        <Header />
        <div className="jobs-content-container">
          <div className="profile-filter-container">
            {this.renderProfileView()}
            <hr />
            <div>
              <FilterGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                changeEmployment={this.changeEmployment}
                changeSalary={this.changeSalary}
              />
            </div>
          </div>
          <div className="jobs-view-container">
            <div className="search-input-container">
              <input
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={input}
                className="search-input"
              />
              <button
                className="search-button"
                type="button"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="render-jobs-container">{this.renderJobs()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
