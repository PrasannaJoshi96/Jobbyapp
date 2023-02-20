import './index.css'

const FilterGroup = props => {
  const renderEmploymentTypes = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(eachType => {
      const {changeEmployment} = props
      const onChangeEmploymentType = event => {
        changeEmployment(event.target.value)
      }
      return (
        <li
          key={eachType.employmentTypeId}
          className="employment-type-list-items"
        >
          <input
            onChange={onChangeEmploymentType}
            id={eachType.employmentTypeId}
            value={eachType.employmentTypeId}
            name={eachType.employmentTypeId}
            type="checkbox"
            className="checkbox"
          />
          <label className="label-item" htmlFor={eachType.employmentTypeId}>
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderSalary = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(eachSalary => {
      const {changeSalary} = props
      const onChangeSalary = event => {
        changeSalary(event.target.value)
      }
      return (
        <li key={eachSalary.salaryRangeId} className="salary-list-item">
          <input
            type="radio"
            onChange={onChangeSalary}
            value={eachSalary.salaryRangeId}
            id={eachSalary.salaryRangeId}
            className="radio-btn"
            name="salary"
          />
          <label htmlFor={eachSalary.salaryRangeId} className="label-item">
            {eachSalary.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="filters-container">
      <h1 className="employee-type-heading">Type of Employment</h1>
      <ul className="employee-type-container">{renderEmploymentTypes()}</ul>
      <hr className="hr-line" />
      <h1 className="employee-type-heading">Salary Range</h1>
      <ul className="salary-range-container">{renderSalary()}</ul>
    </div>
  )
}
export default FilterGroup
