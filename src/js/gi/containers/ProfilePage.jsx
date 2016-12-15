import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Modal from '../../common/components/Modal';
import AboutYourselfFields from '../components/AboutYourselfFields';
import ProfileOverview from '../components/profile/ProfileOverview';
import ProfileCalculator from '../components/profile/ProfileCalculator';
import RetentionRates from '../components/profile/RetentionRates';
import GraduationRates from '../components/profile/GraduationRates';
import SalaryRates from '../components/profile/SalaryRates';
import RepaymentRates from '../components/profile/RepaymentRates';
import ProfileSummary from '../components/profile/ProfileSummary';
import ProfileComplaints from '../components/profile/ProfileComplaints';
import ProfileHistory from '../components/profile/ProfileHistory';

import schoolData from '../mocks/institution';


class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderPageTitle = this.renderPageTitle.bind(this);
    this.renderModals = this.renderModals.bind(this);
    this.renderProfilePageModals = this.renderProfilePageModals.bind(this);
    this.renderProfileSchoolHeaderModals = this.renderProfileSchoolHeaderModals.bind(this);
    this.renderProfileVeteranSummaryModals = this.renderProfileVeteranSummaryModals.bind(this);
    this.renderProfileSummaryModals = this.renderProfileSummaryModals.bind(this);
    this.toggleModalDisplay = this.toggleModalDisplay.bind(this);

    this.state = {
      modals: {
        retention: false,
        gradrates: false,
        salaries: false,
        repayment: false,

        gibillstudents: false,

        vetgroups: false,
        yribbon: false,
        poe: false,
        tool: false,
        eightKeys: false,

        accredited: false,
        typeAccredited: false,
        tuitionPolicy: false,
        singleContact: false,
        creditTraining: false
      }
    }
  }

  renderPageTitle() {
    // school_name = @school.institution.gsub(/\b-\b/, " - ")
    //     .split(/\s/).map(&:capitalize).join(" ").gsub(" - ", "-")
    document.title = "[school name] - GI Bill Comparison Tool";
  }

  renderHeader() {
    return (
      <div className="row">
        <h1 className="va-heading-sans">GI Bill Comparison Tool Search Results</h1>
      </div>
    );
  }

  toggleModalDisplay(name) {
    this.setState({ modals: {
      [name]: !(this.state.modals[name])
    } });
  }

  renderProfilePageModals() {
    return (
      <span>
        <Modal onClose={() => {this.toggleModalDisplay('retention')}} visible={!!this.state.modals.retention}>
          <h3>Retention Rates</h3>
          <p>
            The share of first-time, full-time undergraduates who returned to
            the institution after their freshman year.
          </p>
        </Modal>

        <Modal onClose={() => {this.toggleModalDisplay('gradrates')}} visible={!!this.state.modals.gradrates}>
          <h3>Graduation Rates</h3>
          <p>
            The graduation rate after six years for schools that award
            predominantly four-year degrees and after four years for all other
            schools. These rates are only for full-time students enrolled for
            the first time.
          </p>
          <p>
            Student veteran graduation rates measure full-time Post-9/11 GI Bill
            student's graduation reported within the VA system while the student
            is using benefits.
          </p>
        </Modal>

        <Modal onClose={() => {this.toggleModalDisplay('salaries')}} visible={!!this.state.modals.salaries}>
          <h3>Average Salaries</h3>
          <p>
            The median earnings of former students who received federal
            financial aid, at 10 years after entering school.
          </p>
        </Modal>

        <Modal onClose={() => {this.toggleModalDisplay('repayment')}} visible={!!this.state.modals.repayment}>
          <h3>Repayment Rate</h3>
          <p>
            The share of students who have repaid at least $1 of the
            principal balance on their federal loans within 3 years of leaving
            school.
          </p>
        </Modal>
      </span>
    );
  }

  renderProfileSchoolHeaderModals() {
    return (
      <span>
        <Modal onClose={() => {this.toggleModalDisplay('gibillstudents')}} visible={!!this.state.modals.gibillstudents}>
          <h3>GI Bill Beneficiaries</h3>
          <p>The number of Veterans, Servicemembers and family members utilizing their GI Bill benefits attending this institution the previous calendar year. This number includes all the different chapters of the GI Bill (e.g., <a title="Post-9/11" href="http://www.benefits.va.gov/gibill/post911_gibill.asp" id="anch_423" target="_blank">Post-9/11</a>, <a title="Montgomery GI Bill: MGIB" href="http://www.benefits.va.gov/gibill/montgomery_bill.asp" id="anch_424" target="_blank">Montgomery GI Bill: MGIB</a>, <a title="Reserve Education Assistance Program-REAP" href="http://www.benefits.va.gov/gibill/reap.asp" id="anch_425" target="_blank">Reserve Education Assistance Program-REAP</a>, and <a href="http://www.benefits.va.gov/vocrehab/index.asp" id="anch_426" target="_blank">Vocational Rehabilitation</a>). Please keep in mind that we include this number for informational purposes only and that high or low numbers of VA beneficiaries attending a particular school is not an indication one school is more military friendly than another. This information will be updated annually.</p>
        </Modal>
      </span>
    );
  }


  renderProfileVeteranSummaryModals() {
    return (
      <span>
        <Modal onClose={() => {this.toggleModalDisplay('vetgroups')}} visible={!!this.state.modals.vetgroups}>
          <h3>Student Veterans Group</h3>
          <p>Does this college/university have a student led student veterans group on campus?</p>
          <p>
            If a school has a student veterans group that is not represented on
            the comparison tool, please let us know by emailing us at&nbsp;
            <a title="224A.VBAVACO@va.gov" href="mailto: 224A.VBACO@va.gov?subject=Comparison Tool" id="anch_436">224A.VBAVACO@va.gov</a>.
            Based on your feedback, we will be making quarterly updates to the
            GI Bill Comparison Tool.
          </p>
          <p>
            Please note this email address is only for website related issues,
            all questions regarding GI Bill benefits should be directed to the
            <a href="https://gibill.custhelp.com/app/utils/login_form/redirect/ask" target="_blank">"Ask a Question"</a>
            section of our website.</p>
        </Modal>

        <Modal onClose={() => {this.toggleModalDisplay('yribbon')}} visible={!!this.state.modals.yribbon}>
          <h3>Yellow Ribbon</h3>
          <p>The <a title="Post-9/11 GI Bill" href="http://www.benefits.va.gov/gibill/post911_gibill.asp" id="anch_420" target="_blank">Post-9/11 GI Bill</a> can cover all in-state tuition and fees at public degree granting schools, but may not cover all private degree granting schools and out-of-state tuition. The Yellow Ribbon Program provides additional support in those situations. Institutions voluntarily enter into an agreement with VA to fund uncovered charges. VA matches each dollar of unmet charges the institution agrees to contribute, up to the total cost of the tuition and fees. <a title="Click here for FAQs about the Yellow Ribbon Program" href="http://www.benefits.va.gov/gibill/docs/factsheets/2012_Yellow_Ribbon_Student_FAQs.pdf" id="anch_421" target="_blank">Click here for FAQs about the Yellow Ribbon Program</a></p>
          <p>Only Veterans entitled to the maximum benefit rate (based on service requirements) or their designated transferees may receive this funding. Active duty Servicemembers and their spouses are not eligible for this program (child transferees of active duty Servicemembers may be eligible if the servicemember is qualified at the 100% rate). This information will be updated quarterly.&nbsp;</p>
        </Modal>

        <Modal onClose={() => {this.toggleModalDisplay('poe')}} visible={!!this.state.modals.poe}>
          <h3>Principles of Excellence</h3>
          <p>The <a title="Principles of Excellence" href="http://www.gpo.gov/fdsys/pkg/FR-2012-05-02/pdf/2012-10715.pdf" id="anch_418" target="_blank">Principles of Excellence</a> are guidelines for educational institutions receiving Federal funding. Schools that agree to participate will:</p>
          <ul className="modal-bullets">
            <li>Provide students with a personalized form covering the total cost of an education program.</li>
            <li>Provide educational plans for all Military and Veteran education beneficiaries.</li>
            <li>End fraudulent and aggressive recruiting techniques and misrepresentation.</li>
            <li>Provide accommodations for Service Members and Reservists absent due to service requirements.</li>
            <li>Designate a Point of Contact for academic and financial advising.</li>
            <li>Ensure accreditation of all new programs prior to enrolling students.</li>
            <li>Align institutional refund policies with those under Title IV.</li>
          </ul>
          <p>Foreign schools, high schools, on-the-job training and apprenticeship programs, residency and internship programs, and those who do not charge tuition and fees were not asked to comply with the Principles of Excellence.</p>
          <p>While every effort has been made to ensure the accuracy of the information, prospective students should only use this as a planning tool. The Principles of Excellence schools will be updated quarterly.&nbsp;</p>
        </Modal>

        <Modal onClose={() => {this.toggleModalDisplay('tool')}} visible={!!this.state.modals.tool}>
          <h3>GI Bill® Comparison Tool: About This Tool</h3>
          <p>VA is making it easier to research colleges and employers approved for the GI Bill. Answer just a few questions about yourself and the school/employer you are considering. You’ll receive an estimate of your GI Bill benefits and some information about the facility’s value and affordability.</p>
        </Modal>

        <Modal onClose={() => {this.toggleModalDisplay('eightKeys')}} visible={!!this.state.modals.eightKeys}>
          <h3>8 Keys to {'Veterans\''} Success Sites</h3>
          <p>The "8 Keys to {'Veterans\''} Success" are steps that postsecondary institutions can take to assist Veterans and Service members in transitioning to higher education, completing their college programs, and obtaining career-ready skills.</p>
          <p>Postsecondary institutions listed on this site have voluntarily affirmed their support for the 8 Keys. However, a listing here is not a representation or assurance by the U.S. Department of Education that an institution has implemented the 8 Keys or how well it has implemented them, and it does not constitute an endorsement by the U.S. Department of Education of these institutions or their policies or programs.</p>
          <p> To learn more about accreditaion, visit the U.S. Department of Education's <a href="http://www.ed.gov/veterans-and-military-families/8-keys-success-sites" target="_blank"> 8 Keys to {'Veterans\''} Success</a> page. </p>
        </Modal>
      </span>
    );
  }

  renderProfileSummaryModals() {
    return (
      <span>

        <Modal onClose={() => {this.toggleModalDisplay('accredited')}} visible={!!this.state.modals.accredited}>
          <h3>Is your school accredited</h3>
          <p>Accreditation matters if you plan to start school at one institution and transfer to another to complete your degree. Be sure to ask any potential school about their credit transfer policy. The U.S. Department of Education (ED) maintains a&nbsp;<a href="http://ope.ed.gov/accreditation/" id="anch_384" target="_blank">database</a>&nbsp;of accredited postsecondary institutions and programs. Accreditation is a recognized credential for schools and some programs. As stated by the ED, the goal of accreditation is to ensure that the education provided by institutions of higher education meets acceptable levels of quality.</p>
          <p>To learn more about accreditaion, visit the <a href="http://www.benefits.va.gov/gibill/comparison_tool/about_this_tool.asp#accreditation" target="_blank"> about this tool</a> page. </p>
        </Modal>

        <Modal onClose={() => {this.toggleModalDisplay('typeAccredited')}} visible={!!this.state.modals.typeAccredited}>
          <h3>Accreditation types (Regional vs. National vs Hybrid)</h3>
          <p>Is the school regionally or nationally accredited at the institution level?</p>
          <p>Schools are accredited by private educational associations of regional or national scope. While the Department of Education does not say whether regional or national accreditation is better, a recent ED study revealed that, “Nearly 90 percent of all student credit transfer opportunities occurred between institutions that were regionally, rather than nationally, accredited.” <a href="http://nces.ed.gov/pubs2014/2014163.pdf" id="anch_386">http://nces.ed.gov/pubs2014/2014163.pdf</a></p>
          <p> To learn more about accreditaion, visit the <a href="http://www.benefits.va.gov/gibill/comparison_tool/about_this_tool.asp#accreditation_type" target="_blank"> about this tool</a> page. </p>
        </Modal>

        <Modal onClose={() => {this.toggleModalDisplay('tuitionPolicy')}} visible={!!this.state.modals.tuitionPolicy}>
          <h3>Link to Veterans Tuition Policy</h3>
          <p>URL for tuition policies specifically related to veterans and military service members.</p>
        </Modal>

        <Modal onClose={() => {this.toggleModalDisplay('singleContact')}} visible={!!this.state.modals.singleContact}>
          <h3>Single Point of Contact For Veterans</h3>
          <p>Does the school have a dedicated point of contact for support services for veterans, military servicemembers, and their families?</p>
        </Modal>

        <Modal onClose={() => {this.toggleModalDisplay('creditTraining')}} visible={!!this.state.modals.creditTraining}>
          <h3>Credit for Military Training</h3>
          <p>Does the school offer postsecondary credit for experiences and military training?</p>
        </Modal>
      </span>
    );
  }

  renderModals() {
    return (
      <span>
        {this.renderProfilePageModals()}
        {this.renderProfileSchoolHeaderModals()}
        {this.renderProfileVeteranSummaryModals()}
        {this.renderProfileSummaryModals()}
      </span>
    );
  }

  renderBackLink() {
    if (this.source == 'home') {
      return null;
    }
    return (
      <div className="row onerempadleft">
        <div id="backtosearch-noprint">
          <a id="back-link" href="#" className="backlink">
            <i className="fa fa-chevron-left back-chevron"></i>
            Back to Search Results
          </a>
        </div>
      </div>
    );
  }

  renderOutcomeMeasuresLink() {
    return (
      <span>
        <p>Access a comprehensive spreadsheet of <a id="veteran-outcome-spreadsheet-link-out" title="Veteran Outcome Measures" href="http://www.benefits.va.gov/gibill/docs/OutcomeMeasuresDashboard.xlsx" id="anch_373" target="_blank">Veteran Outcome Measures</a> (<i className="fa fa-file-excel-o info-icons"></i> | 14.4 MB)</p>
      </span>
    );
  }

  renderNotFound() {
    document.title = 'Institution Not Found - GI Bill Comparison Tool';
    return (
      <div className="section one">
        <p>
          Unknown facility code.<br/>
          Please search for an institution.
        </p>
      </div>
    );
  }

  render() {
    // error message if facility code is unkown / institution not found?
    if (this.props.institution == null) { return renderNotFound(); }
    this.renderPageTitle();
    return (
      <span className="profile-page-component">
        <div className="section">
          <Breadcrumbs currentLabel="Institution"/>
          {this.renderHeader()}

          <div className="action-bar">
            <div className="row">
              <div className="small-10 medium-10 columns filter-horizontal" id="horiz-filters-noprint2">
                <AboutYourselfFields labels={false}/>
              </div>
              <div className="medium-2 columns">
                <a href="#">
                  <button type="button">Reset Search</button>
                </a>
              </div>
            </div>
          </div>

          <div className="section one">
            {this.renderBackLink()}

            <div className="row">
              <div className="large-12 columns">
                <ProfileOverview institution={this.props.institution}
                  queryParams={this.props.queryParams}
                  toggleModalDisplay={this.toggleModalDisplay}/>
              </div>
            </div>

            <div className="row">
              <div className="small-12 columns accordion-vert-spacing">
                <ProfileCalculator institution={this.props.institution}/>
              </div>
            </div>

            <div className="row">
              <div className="small-12 columns accordion-vert-spacing">
                <div className="row">
                  <RetentionRates institution={this.props.institution}/>
                  <GraduationRates institution={this.props.institution}/>
                </div>
                <div className="row">
                  <SalaryRates institution={this.props.institution}/>
                  <RepaymentRates institution={this.props.institution}/>
                </div>
              </div>
              <div className="small-12 columns access-sheet clearfix">
                {this.renderOutcomeMeasuresLink()}
              </div>
            </div>

            <div className="row">
              <div className="small-12 columns accordion-vert-spacing">
                <ul className="accordion" data-accordion>
                  <li className="accordion-navigation">
                    <a href="#panel-school-summary" aria-expanded="true">School Summary</a>
                    <div id="panel-school-summary" className="content active">
                      <ProfileSummary institution={this.props.institution} toggleModalDisplay={this.toggleModalDisplay}/>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="small-12 columns accordion-vert-spacing">
                <ul className="accordion" data-accordion>
                  <li className="accordion-navigation">
                    <a href="#panel-caution-flags" aria-expanded="true">Caution Flags ({this.props.institution.complaints_main_campus_roll_up} Student Complaints)</a>
                    <div id="panel-caution-flags" className="content active">
                      <ProfileComplaints institution={this.props.institution}/>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="small-12 columns accordion-vert-spacing">
                <ul className="accordion" data-accordion>
                  <li className="accordion-navigation">
                    <a href="#panel-historical-info" aria-expanded="true">Historical School Information</a>
                    <div id="panel-historical-info" className="content active">
                      <ProfileHistory institution={this.props.institution}/>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {this.renderModals()}
      </span>
    );
  }
}

ProfilePage.defaultProps = {
  institution: schoolData().data[0],
  queryParams: React.PropTypes.object.isRequired
};

export default ProfilePage;