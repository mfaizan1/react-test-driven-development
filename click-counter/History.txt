import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Item } from '@arceo/ui-components/src/ui/policy/CardUtil';
import { media } from '@arceo/ui-components/src/styles/BaseStyles';
import Quote from './Quote';
import ApplicationQuestions from './status/ApplicationQuestions';
import { PricingTierCards, StyledProductHeader, Spacer } from 'components/pages/application/HistoryInfo';
import { isProduct, isReferralRequired } from 'components/pages/application/Profile';
import { isEmpty, jsonLogicApply, getFormatData, getRiskClass } from '@arceo/ui-components/src/utils';
import BrokerReportStatusContainer from 'containers/application/BrokerReportStatusContainer';
import ApplicationHistoryContainer from 'containers/application/ApplicationHistoryContainer';
import { EndorsementSubSection } from './endorsements/Endorsements';
import Endorsements from './endorsements/Endorsements';
import ScanPercentile from './brokerreport/ScanPercentile';
import { ApplicationStatus, SectionKey } from 'middleware/models';
import { Spinner } from '@arceo/ui-components/src/ui/loading/Spinner';
import { fromJS } from 'immutable';

import { spacing, fontFamily, fontWeight, fontSize, color } from '@arceo/ui-components/src/styles/Theme';

const resizeGridItem = (item) => {
    if (!item.children[0]) {
        return;
    }
    const grid = document.getElementById('grid');
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil(
        (item.children[0].getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
    );
    item.style.gridRowEnd = 'span ' + rowSpan;
};
export const resizeAllGridItems = () => {
    const grid = document.getElementById('grid');
    if (grid && grid.children) {
        const allItems = document.getElementById('grid').children;
        for (let x = 0;x < allItems.length;x++) {
            resizeGridItem(allItems[x]);
        }
    }
};

export const HistoryOutsideContainer = styled.div`
    display: grid;
    align-self: center;
    margin-right: 0px;
    justify-content: center;
    margin-top: ${ spacing('s') };
`;

export const OuterContainer = styled.div`
    display: grid;
    min-width: 688px;
    grid-template-columns: 1fr;
    grid-row-gap: 16px;
    margin: 0px;
    justify-options: center;

    // grid styling on small resolutions
    ${ media.phone`
        grid-template-columns: 1fr;
    `}
`;

const SectionContainer = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-row-gap: 16px;
`;

export const Container = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-column-gap: ${ spacing('xl') };
    width:100%;
    margin-right: 0px;
    ${ props => props.labelAbove && css`
        grid-template-columns: 1fr;
    `}

    // grid styling on small resolutions
    ${ media.phone`
        grid-template-columns: 1fr;
    `}
`;

export const ProductHeader = styled.div`
    font-size: 36px;
    margin-bottom: 20px;
`;

export const Header = styled.p`
    font-size: 24px;
    margin-bottom: 20px;
`;

export const Header2 = styled.p`
    font-size: 22px;
    margin-top: 10px;
`;

export const Section = styled.div`
    min-width: 328px;
    width: auto;
    .value {
        font-size: ${ fontSize('body') };
        font-weight: ${ fontWeight('semiBold') };
    }

    .total {
        border-top: 1px solid ${ color('border', 'policyGridTotal') };
        padding-top: 10px;
    }

    .status-fields {
        padding: 8px 0;
    }
`;

export const FixedSection = styled.div`
    min-width: 328px;
    width: auto;
    margin-top: 10px;
    margin-bottom: 40px;

    .value {
        font-size: ${ fontSize('body') };
        font-weight: ${ fontWeight('semiBold') };
    }

    .total {
        border-top: 1px solid ${ color('border', 'policyGridTotal') };
        padding-top: 5px;
    }

    .status-fields {
        padding: 8px 0;
    }
`;

const RiskDataLabel = styled.div`
  width: 328px;
  height: 53px;
  font-size: ${ fontSize('body') };
  font-weight: ${ fontWeight('semiBold') };
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${ color('text', 'riskDataLabel') };
  vertical-align: bottom;
`;

export const GrayLineSeperator = styled.div`
  min-width: 688px;
  border: 1px solid ${ color('border') };
`;

const InformationContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-row-gap: 32px;
    min-width: 688px;
`;

const InformationHeader = styled.div`
  min-width: 688px;
  height: 32px;
  font-family: Assistant;
  font-size: ${ fontSize('subHeading') };
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color:  ${ color('text') };
`;

const InformationDescription = styled.div`
  min-width: 688px;
  height: 40px;
  font-family: ${ fontFamily };
  font-size: ${ fontSize('body') };
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.11;
  letter-spacing: normal;
  color: ${ color('text') };
`;

export const ProductStatusContainer = styled.div`
    min-width: 328px;
    width: auto;
`;

const TotalPremiumContainer = styled.div`
    border-top: 1px solid ${ color('border', 'totalBorder') };
`;

const TotalDiv = styled.div`
    margin-top: 7px;
`;

const SecurityQuestionsContainer = styled.div``;

const InformationRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 32px;
    grid-auto-rows: 10px;
`;

const QuotesRow = styled(InformationRow)`
    margin-top: 32px;
    grid-template-rows: auto;
`;


const SpanColumn = styled.div`
    grid-column-start: 1;
    grid-column-end: 3;
`;

const StyledSectionContainer = styled.div``;

function getRiskClassLabel(application) {
    return (
        <BrokerReportStatusContainer
            applicationId={application.getId()}
            renderChild={(data) => {
                let label = '-';
                if (data && data.checkBrokerReportJob
                    && data.checkBrokerReportJob.status === 'success') {
                    label = getRiskClass(data.checkBrokerReportJob.scan_percentile);
                }
                return (
                    label
                );
            }}
        />
    );
}

function getQuestionInfo(item, info, { product }) {
    const key = item.getIn(['key']).replace('previous_', '');
    let parsedKey = null;
    // TODO: better handle distinction between org info vs form
    if (key.startsWith('organization_detail.')) {
        parsedKey = key.split('.').join('_');
    } else if (key.startsWith('form.')) {
        parsedKey = key.split('.')[1];
    }
    const question = product.get('questions').find(q => q.key === parsedKey);
    return question && question.get(info);
}

function resolveValue({ application }, item) {
    let value = null;
    if (item.get('key').includes('scan_percentile')) {
        value = <ScanPercentile application={application} />;
    } else if (item.get('key').includes('arceo_risk_class')) {
        value = getRiskClassLabel(application);
    } else if (item.get('key').includes('office365_configuration')) {
        // TODO formatting from fixture?
        const office365TotalItems = application.getIn(['form', 'office365_total_items']);
        const office365ItemsForReview = application.getIn(['form', 'office365_items_for_review_count']);
        if (office365TotalItems >= 0 && office365ItemsForReview >= 0) {
            value = `${office365TotalItems - office365ItemsForReview}/${office365TotalItems}`;
        } else {
            value = '-';
        }
    } else {
        value = application.getIn(item.get('key').split('.'));
    }
    return value;
}

function getPricingTierCards(
    application,
    section, sectionKey,
    productCard, productKey,
    selectedOnly,
    approvalSectionStatuses, appStatus) {
    const currentPricingTierCards = (
        <PricingTierCards
            application={application}
            productCard={productCard}
            productKey={productKey}
            selectedOnly={selectedOnly}
            current={true}
            sectionKey={sectionKey}
        />
    );

    if (sectionKey === SectionKey.APPROVED_QUOTE || sectionKey === SectionKey.POLICY_INFO) {
        if (!approvalSectionStatuses.includes(appStatus)) {
            return null;
        }
        // show Approved Quote section if past bind state
        return currentPricingTierCards;
    } else if (sectionKey === SectionKey.PROPOSED_QUOTE) {
        return (
            <ApplicationHistoryContainer
                applicationId={application.get('id')}
                userOrganizationId={application.getIn(['organization_detail', 'created_by_id'])}
                oldStatus={ApplicationStatus.QUOTE}
                newStatus={ApplicationStatus.REFER_QUOTE}
                renderChild={(data, loading) => {
                    if (loading) {
                        return <Spinner loading={true} />;
                    }
                    const { applicationHistory: { pageInfo, results, fetchError } } = data;
                    //  TODO: handle fetchError?
                    if (!fetchError && pageInfo && pageInfo.total > 0) {
                        const previousQuoteData = results[0];
                        application = application
                            .set(
                                'previous_form', 
                                fromJS(
                                    previousQuoteData 
                                    && previousQuoteData.old_quote 
                                    && previousQuoteData.old_quote.form
                                )
                            ).set(
                                'previous_pricing', 
                                fromJS(previousQuoteData && previousQuoteData.old_pricing)
                            );
                    }

                    if (isEmpty(application.previous_form
                        || isEmpty(application.previous_pricing))) {
                        // use current prices for Proposed and Approved Quote sections
                        return currentPricingTierCards;
                    }
                    return (
                        <PricingTierCards
                            application={application}
                            productCard={productCard}
                            productKey={productKey}
                            selectedOnly={selectedOnly}
                            current={false}
                            sectionKey={sectionKey}
                        />
                    );
                }}
            />
        );
    }
}

function renderEndorsementSection(application, currentUser) {
    return (
        <EndorsementSubSection
            application={application}
            pricingType="pricing"
            currentUser={currentUser}
        />
    );
}

function renderRiskStrategiesCoverageSummaryOption(application, product, section, option) {
    const key = `${section.get('key')}-${option.get('label')}`;
    const singleColumn = option.get('singleColumn');
    const label = option.get('label');
    const className = 'status-fields';
    //New: dynamically evaluate a value
    const value = jsonLogicApply(
        option.getIn(['format']).toJS(),
        getFormatData(application, option.get('key').replace('limit_', '')));
    const isCurrencyType = true;

    return (
        <Item
            key={key}
            singleColumn={singleColumn}
            label={label}
            className={className}
            value={value}
            currencyType={isCurrencyType}
        />  
    );
}

function renderOption(application, product, section, option) {
    //New:can hide a label or a value
    const hideValue = option.get('hide_value') ? jsonLogicApply(
        option.get('hide_value').toJS(),
        getFormatData(application, option.get('key'))) : false;

    const hideLabel = option.get('hide_label') ? jsonLogicApply(
        option.get('hide_label').toJS(),
        getFormatData(application, option.get('key'))) : false;

    if (hideValue && hideLabel) {
        return;
    }
    
    const key = `${section.get('key')}-${option.get('key')}`;
    const singleColumn = option.get('singleColumn');
    const label = hideLabel ? '' : option.get('label') || getQuestionInfo(option, 'label', { product });
    const value = hideValue ? '' : resolveValue({ application }, option);
    const className = 'status-fields';
    const formatValue = val => (option.get('format') ? jsonLogicApply(
        option.get('format').toJS(),
        getFormatData(application, option.get('key'))) : val);
    const isCurrencyType = getQuestionInfo(option, 'value_type', { product }) === 'currency';

    return (
        <Item
            key={key}
            singleColumn={singleColumn}
            label={label}
            className={className}
            value={value}
            formatValue={formatValue}
            currencyType={isCurrencyType}
        />  
    );
}

function renderOptionBySectionKey(isCarrier, hasBeenReferred, sectionKey) {
    switch (sectionKey) {
    case SectionKey.COMPANY_INFO:
        return true;
    case SectionKey.COVERAGE_SUMMARY:
        return true;
    case SectionKey.COMPANY_INFO_CARRIER_HISTORY: 
        return true;
    case SectionKey.COVERAGE_SUMMARY_CARRIER_HISTORY:
        return true;
    case SectionKey.POLICY_INFO:
        if (!hasBeenReferred) {
            return true;
        }
        return false;
    case SectionKey.PROPOSED_QUOTE:
        if (hasBeenReferred) {
            return true;
        }
        return false;
    case SectionKey.APPROVED_QUOTE:
        if (hasBeenReferred) {
            return true;
        }
        return false;
    case SectionKey.COMMENTS:
        return hasBeenReferred;
    default:
        return false;
    }
}

export function renderOptions({ application, product, section, selectedOnly,
    currentUser, label, overrideStyle,index }) {
    if (!section) {
        return <div key = {`empty-section-${index}`} />;
    }
    const type = section.getIn(['options', 'type']);
    const productCard = application.getIn(['productCards']).find(isProduct);
    const productKey = productCard.getIn(['product', 'key']);
    const approvalSectionStatuses = ['review', 'issue'];
    const appStatus = application.status;
    const sectionKey = section.get('key');
    const hasBeenReferred = application.get('has_been_referred');
    const isCarrier = currentUser.isCarrier();
    if (!renderOptionBySectionKey(isCarrier, hasBeenReferred, sectionKey)) {
        return;
    }

    const endorsementTotal = Endorsements.getEndorsementTotal(application);

    let StyledSection = Section;
    if (overrideStyle) {
        const isSectionStyle = (sectionKey === SectionKey.COMMENTS
            || sectionKey === SectionKey.COMPANY_INFO_CARRIER_HISTORY
            || sectionKey === SectionKey.DATES
            || sectionKey === SectionKey.COVERAGE_SUMMARY_CARRIER_HISTORY);

        StyledSection = isSectionStyle ? Section : FixedSection;
        StyledSection = label === 'ReviewAdjust' ? Section : StyledSection;
    }
    let content = null;

    if (type === 'application_info') {
        if (!approvalSectionStatuses.includes(appStatus) 
            && sectionKey === SectionKey.APPROVED_QUOTE) {
            return null;
        }
        content = (
            <StyledSectionContainer key={`${section.getIn(['key'])}-section`}>
                <StyledSection>
                    <Header>{ section.getIn(['label']) }</Header>
                    {
                        section.getIn(['options', 'values'])
                            .map(a => (a && a.get('key') && (a.get('key').includes('limit_'))
                                ? renderRiskStrategiesCoverageSummaryOption(
                                    application, product, section, a)
                                : renderOption(application, product, section, a)))
                    }
                    {
                        getPricingTierCards(
                            application,
                            section, sectionKey,
                            productCard, productKey,
                            selectedOnly,
                            approvalSectionStatuses,
                            appStatus
                        )
                    }
                </StyledSection>
            </StyledSectionContainer>
        );
    } else if (type === 'string') {
        content = (
            <StyledSectionContainer key={`${section.getIn(['key'])}-section`}>
                <StyledSection>
                    <Header>{ section.getIn(['label']) }</Header>
                    {
                        section.getIn(['options', 'values'])
                            .map(a => (
                                <Item
                                    key={`${section.getIn(['key'])}-${a}`}
                                    label={a}
                                    className="status-fields"
                                />
                            )
                            )
                    }
                    {
                        currentUser && currentUser.canViewEndorsements() &&
                    endorsementTotal > 0 && renderEndorsementSection(application, currentUser)
                    }
                </StyledSection>
            </StyledSectionContainer>
        );
    }
    return (
        <Fragment
            key={`${section.getIn(['key'])}-section`}
        >
            { content }
        </Fragment>
    );
}

function makeOrderedData(product, label, currentUser, application) {
    const previewSection = product.getIn(['preview_sections']);
    const left = previewSection.filter((section) => {
        const sectionKey = section.get('key');
        const hasBeenReferred = application.get('has_been_referred');
        const isCarrier = currentUser.isCarrier();
        return (renderOptionBySectionKey(isCarrier, hasBeenReferred, sectionKey) &&
        section.get('sub_section') === label &&
        ((section.get('column') === 'left')) &&
        (section.get('key') !== 'proposed_quote' && section.get('key') !== 'approved_quote'));
    });
    const right = previewSection.filter((section) => {
        const sectionKey = section.get('key');
        const hasBeenReferred = application.get('has_been_referred');
        const isCarrier = currentUser.isCarrier();
        return (renderOptionBySectionKey(isCarrier, hasBeenReferred, sectionKey) &&
             section.get('sub_section') === label &&
        ((section.get('column') === 'right')) &&
        (section.get('key') !== 'proposed_quote' && section.get('key') !== 'approved_quote'));
    });
    const loopSize = left.size >= right.size ? left.size : right.size;
    const ordered = [];
    for (let i = 0; i < loopSize; i++) {
        const leftItem = left.get(i);
        const rightItem = right.get(i);

        if (leftItem || rightItem) {
            ordered.push(leftItem, rightItem);
        }
    }
    return ordered;
}

export function renderInfoRow(application, product, selectedOnly,
    currentUser, label, overrideStyle) {
    const ordered = makeOrderedData(product, label, currentUser, application);
    const quotes = product
        .getIn(['preview_sections'])
        .filter(
            section => (section.get('sub_section') === label &&
                (section.get('column') === 'left' || section.get('column') === 'right') &&
                (section.get('key') === 'proposed_quote' || section.get('key') === 'approved_quote')
            ));
    return (
        <ProductStatusContainer>
            <InformationRow id="grid">
                {
                    ordered
                        .map((section,index) => renderOptions({
                            application,
                            product,
                            section,
                            selectedOnly,
                            currentUser,
                            label,
                            overrideStyle,
                            index
                        }))
                }
            </InformationRow>
            <QuotesRow>
                {
                    quotes
                        .map(section => renderOptions({
                            application,
                            product,
                            section,
                            selectedOnly,
                            currentUser,
                            label,
                            overrideStyle
                        }))
                }
            </QuotesRow>
            <SpanColumn>
                {
                    product
                        .getIn(['preview_sections'])
                        .filter(
                            section => section.getIn(['sub_section']) === label &&
                            (section.getIn(['column']) === 'span')
                        )
                        .map(section => renderOptions({
                            application,
                            product,
                            section,
                            selectedOnly,
                            currentUser,
                            label,
                            overrideStyle
                        }))
                }
            </SpanColumn>
        </ProductStatusContainer>
    );
}

export function getInfoSection({ application, currentUser },
    label, hideTitle = false, selectedOnly = false, overrideStyle = false) {
    const content = application.getIn(['productCards'])
        .filter(productCard => productCard.getIn(['product', 'product_type']) === 'product')
        .map(productCard =>
            <Fragment
                key={`product-status-${productCard.getIn(['product', 'key'])}`}
            >
                { !hideTitle && renderProductHeader({ product : productCard.get('product') }) }
                { renderInfoRow(application, productCard.get('product'), selectedOnly, currentUser, label, overrideStyle) }
            </Fragment>
        );
    return (
        <Fragment>
            <Container>
                { content }
            </Container>
        </Fragment>
    );
}

export function InsuredRiskData(props) {
    const { labelAbove } = props;
    return (
        <Container
            labelAbove={labelAbove}
        >
            <Fragment>
                <RiskDataLabel>
                    Insured Risk Data
                </RiskDataLabel>
                <div>
                    <Section>
                        <Item
                            className="status-fields"
                            label={'Peer Percentile (External)'}
                            value={'--'}
                        />

                        <Item
                            className="status-fields"
                            label={'Peer Percentile (Internal)'}
                            value={'--'}
                        />
                    </Section>
                </div>
            </Fragment>
        </Container>
    );
}

export function ProductPricingStatus({ product, application, currentUser }) {
    return (
        <ProductStatusContainer>
            { getInfoSection({ application, currentUser }, 'History', false, false) }
        </ProductStatusContainer>
    );
};

//keep this function for now.
export function TotalPremium (props) {
    const { application } = props;
    return (
        <Fragment>
            <div />
            <TotalPremiumContainer>
                <TotalDiv>
                    <div />
                    <Item
                        label={'Total Premium '}
                        className="status-fields"
                        value={Quote.getGrandTotal(application.getIn(['pricing']))}
                        strongValue
                    />
                </TotalDiv>
            </TotalPremiumContainer>

        </Fragment>

    );
}

export function renderProductHeader ({ product }) {
    return (
        <Fragment
            key={`product-status-${product.getIn(['key'])}`}
        >
            <StyledProductHeader>
                {product.getIn(['name'])}
            </StyledProductHeader>

        </Fragment>
    );
}

export function GraySeperator() {
    return (
        <GrayLineSeperator />
    );
}

function renderHeaderLabel (label) {
    return (
        <InformationHeader>
            { label }
        </InformationHeader>
    );
}

export function renderContent (content) {
    //  TODO: handle justification map
    return (
        <InformationDescription>
            {content && content.toString()}
        </InformationDescription>
    );
}

export function Profile(props) {
    //todo: This needs to be fixed later
    const { application } = props;
    const justification = application.getIn(['justification']);
    if (justification && justification.toString().length > 0) {
        return (
            <SectionContainer>
                {renderHeaderLabel('Profile')}
            </SectionContainer>
        );
    }
    return null;
}

export function SecurityQuestions(props) {
    return (
        <SecurityQuestionsContainer>
            <ApplicationQuestions
                {...props}
            />
        </SecurityQuestionsContainer>
    );
}

export function DetailedInformation(props) {
    return (
        <InformationContainer>
            <Spacer />
            {/* TODO: There's no justification error from quoter <Profile {...props} /> */}
            <SecurityQuestions {...props} />
        </InformationContainer>
    );
}

export default function History(props) {
    const { application, currentUser, selectedOnly } = props;
    return (
        <HistoryOutsideContainer>
            <OuterContainer>
                { getInfoSection({ application, currentUser }, 'History', false, selectedOnly, true) }
                <DetailedInformation {...props} />
            </OuterContainer>
        </HistoryOutsideContainer>
    );
}
