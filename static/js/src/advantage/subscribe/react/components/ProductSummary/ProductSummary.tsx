import React, { useContext } from "react";
import { Col, Row, Select } from "@canonical/react-components";
import { FormContext } from "advantage/subscribe/react/utils/FormContext";
import { isMonthlyAvailable, Periods } from "../../utils/utils";
import { currencyFormatter } from "advantage/react/utils";
import PaymentModal from "../PaymentModal";


const ProductSummary = () => {
  const { quantity, period, setPeriod, product } = useContext(
    FormContext
  );
  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value as Periods);
  };

  const isHidden = !product || !quantity || quantity < 1;

  return (
    <section
      className={`p-strip--light is-shallow p-shop-cart ${
        isHidden ? "p-shop-cart--hidden" : ""
      }`}
      id="summary-section"
    >
      <Row className="u-sv3">
        <Col size={12}>
          <table className="p-table--mobile-card">
            <thead>
              <tr>
                <th>Subscription</th>
                <th>Quantity</th>
                <th>Billing</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-heading="Subscription">{product?.name}</td>
                <td data-heading="Quantity">{quantity}</td>
                <td data-heading="Billing">
                  {isMonthlyAvailable(product) ? (
                    <>
                      <Select
                        name="billing-period"
                        className="u-no-margin--bottom"
                        defaultValue={period}
                        options={[
                          {
                            label: "Billed Annualy",
                            value: Periods.yearly,
                          },
                          {
                            label: "Billed Monthly",
                            value: Periods.monthly,
                          },
                        ]}
                        onChange={handlePeriodChange}
                      />
                    </>
                    ) : "Billed Yearly"}
                </td>
                <td data-heading="Total" className="u-align--right">
                  <strong>
                    {currencyFormatter.format(
                      ((product?.price.value ?? 0) / 100) * quantity
                    )}{" "}
                  </strong>
                  <p className="p-text--small">per {period === Periods.yearly ? "year" : "month"}</p>
                  <p className="p-text--small">
                    Any applicable taxes are calculated at checkout
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col className={"u-align--right"} size={3} emptyLarge={10}>
          <PaymentModal isHidden={isHidden} />
        </Col>
      </Row>
    </section>
  );
};

export default ProductSummary;
