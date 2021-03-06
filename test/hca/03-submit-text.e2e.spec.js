const E2eHelpers = require('../util/e2e-helpers');
const Timeouts = require('../util/timeouts.js');
const HcaHelpers = require('../util/hca-helpers.js');

module.exports = E2eHelpers.createE2eTest(
  (client) => {
    HcaHelpers.initApplicationSubmitMock();

    // Ensure introduction page renders.
    client
      .url(`${E2eHelpers.baseUrl}/healthcare/apply/application/`)
      .waitForElementVisible('body', Timeouts.normal)
      .assert.title('Apply for Health Care: Vets.gov')
      .waitForElementVisible('.form-panel', Timeouts.slow)  // First render of React may be slow.
      .click('.form-panel .usa-button-primary');
    E2eHelpers.overrideVetsGovApi(client);
    E2eHelpers.expectNavigateAwayFrom(client, '/introduction');

    // Personal Information page.
    client.expect.element('input[name="fname"]').to.be.visible;
    HcaHelpers.completePersonalInformation(client, HcaHelpers.testValues, true);
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/veteran-information/personal-information');

    // Birth information page.
    client.expect.element('select[name="veteranBirthMonth"]').to.be.visible;
    HcaHelpers.completeBirthInformation(client, HcaHelpers.testValues, true);
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/veteran-information/birth-information');

    // Demographic information page.
    client.expect.element('select[name="gender"]').to.be.visible;
    HcaHelpers.completeDemographicInformation(client, HcaHelpers.testValues, true);
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/veteran-information/demographic-information');

    // Veteran Address page.
    client.expect.element('input[name="address"]').to.be.visible;
    HcaHelpers.completeVeteranAddress(client, HcaHelpers.testValues, true);
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/veteran-information/veteran-address');

    // Contact Information Page.
    client.expect.element('input[name="email"]').to.be.visible;
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/veteran-information/contact-information');

    // Military Service Information Page.
    client.expect.element('select[name="lastServiceBranch"]').to.be.visible;
    HcaHelpers.completeMilitaryService(client, HcaHelpers.testValues, true);
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/military-service/service-information');

    // Military Service Additional Information Page.
    client.expect.element('input[name="purpleHeartRecipient"] + label').to.be.visible;
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/military-service/additional-information');

    // VA Benefits Basic Info page.
    client.expect.element('input[name="compensableVaServiceConnected-0"] + label').to.be.visible;
    HcaHelpers.completeVaBenefits(client, HcaHelpers.testValues, true);
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/va-benefits/basic-information');

    // Financial disclosure page.
    client.expect.element('input[name="discloseFinancialInformation-0"] + label').to.be.visible;
    HcaHelpers.completeFinancialDisclosure(client, HcaHelpers.testValues, true);
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/household-information/financial-disclosure');

    // Selecting "no" for financial disclosures here causes the application to skip the next several sections:
    // Spouse information Page
    // Child Information Page
    // Annual Income Page
    // Deductible Expenses Page

    // Medicare and Medicaid Page.
    client.expect.element('input[name="isMedicaidEligible-0"] + label').to.be.visible;
    HcaHelpers.completeMedicareAndMedicaid(client, HcaHelpers.testValues, true);
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/insurance-information/medicare');

    // Insurance Information Page.
    client.expect.element('input[name="isCoveredByHealthInsurance-0"] + label').to.be.visible;
    HcaHelpers.completeInsuranceInformation(client, HcaHelpers.testValues, true);
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/insurance-information/general');

    // Additional VA Insurance Information Page.
    client.expect.element('select[name="state"]').to.be.visible;
    HcaHelpers.completeVaInsuranceInformation(client, HcaHelpers.testValues, true);
    client.click('.form-panel .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/insurance-information/va-facility');

    // Review and Submit Page.
    client.expect.element('button.edit-btn').to.be.visible;

    client.expect.element('.form-panel .usa-button-primary').text.to.equal('Submit Application');
    client.click('[name=privacyAgreement]');
    client.click('.form-panel .usa-button-primary');
    client.expect.element('.form-panel .hca-button-green').text.to.equal('✓ Submitted');

    client.expect.element('.js-test-location').attribute('data-location')
      .to.not.contain('/review-and-submit').before(Timeouts.submission);

    // Submit message
    client.expect.element('.success-alert-box').to.be.visible;

    client.end();
  });
