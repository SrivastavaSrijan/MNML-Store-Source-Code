import React from 'react';
export const SizingChart = () => {
  return (
    <div className="table-container ">
      <table className="table  is-size-6 is-family-secondary has-text-centered box is-muted-link is-size-7-mobile  has-text-black">
        <thead>
          <tr>
            <td>
              <strong></strong>
            </td>
            <td>
              <strong>
                <abbr title="Small">S</abbr>
              </strong>
            </td>
            <td>
              <strong>
                <abbr title="Medium">M</abbr>
              </strong>
            </td>
            <td>
              <strong>
                <abbr title="Large">L</abbr>
              </strong>
            </td>
            <td>
              <strong>
                <abbr title="X-Large">XL</abbr>
              </strong>
            </td>
            <td>
              <strong>
                <abbr title="XX-Large">XXL</abbr>
              </strong>
            </td>
          </tr>
        </thead>
        <tbody className="is-size-7">
          <tr>
            <td className="is-size-6 is-size-7-mobile">
              {' '}
              <strong>Neck</strong>
            </td>
            <td>14</td>
            <td>15</td>
            <td>16</td>
            <td>17</td>
            <td>18</td>
          </tr>
          <tr>
            <td className="is-size-6 is-size-7-mobile">
              <strong>Chest</strong>
            </td>
            <td>35-37</td>
            <td>38-40</td>
            <td>41-43</td>
            <td>44-46</td>
            <td>47-49</td>
          </tr>
          <tr>
            <td className="is-size-6 is-size-7-mobile">
              <strong>Sleeve</strong>
            </td>
            <td>32-33</td>
            <td>33-34</td>
            <td>34-35</td>
            <td>35-36</td>
            <td>36-36.5</td>
          </tr>
          <tr>
            <td className="is-size-6 is-size-7-mobile">
              <strong>Waist</strong>
            </td>
            <td>29-31</td>
            <td>32-34</td>
            <td>35-37</td>
            <td>38-40</td>
            <td>41-43</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
